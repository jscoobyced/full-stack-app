import { EntityWithCategory, Category } from "../models/common";

export const getUniqueCategories = (data: EntityWithCategory[]) => {
  if (!data) {
    return [];
  }
  const rowCategories = data.flatMap(model => model.category);
  // Need to do manually because data coming from API
  // can't dedupe using ES6 'Set'
  const categories = [] as Category[];
  rowCategories.forEach(category => {
    const filtered = categories.filter(existing => category.id === existing.id);
    if (!filtered || filtered.length === 0) {
      categories.push(category);
    }
  });
  return categories;
}
