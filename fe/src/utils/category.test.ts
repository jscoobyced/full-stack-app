import { EntityWithCategory } from "../models/common";
import { mockIngredients } from "../services/Ingredient/mock-data";
import { getUniqueCategories } from "./category";

describe('getUniqueCategories', () => {

  it('can get unique list with data', () => {
    const unique = getUniqueCategories(mockIngredients);
    expect(unique.length).toEqual(2);
  });

  it('gets empty list for undefined input', () => {
    const unique = getUniqueCategories(undefined as unknown as EntityWithCategory[]);
    expect(unique.length).toEqual(0);
  });

  it('gets empty list for empty input', () => {
    const unique = getUniqueCategories([]);
    expect(unique.length).toEqual(0);
  });
});
