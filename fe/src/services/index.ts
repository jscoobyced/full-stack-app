export type IngredientCategory = { categoryId: number; name: string; }
export type Ingredient = { ingredientId: number; category: IngredientCategory; name: string; calories: number; };
export type IngredientData = {
  categories: IngredientCategory[],
  ingredients: Ingredient[],
}

export type UnitCategory = { categoryId: number; name: string; }
export type Unit = { unitId: number; category: UnitCategory; name: string; symbol: string};
export type UnitData = {
  categories: UnitCategory[],
  units: Unit[],
}

export type SelectedIngredient = {
  ingredient: Ingredient,
  unit: Unit,
  quantity: number,
};
