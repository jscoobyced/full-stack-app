import { BaseEntity, BaseEntityWithName, EntityWithCategory } from './common';

// Category
export type Category = BaseEntityWithName;

// Unit
export type Unit = EntityWithCategory & { symbol: string };

// Ingredients
export type Ingredient = EntityWithCategory;

// Calories
export type Calorie = BaseEntity & {
  ingredientId: number;
  unit: Unit;
  serving: number;
  calories: number;
};

export type SelectedIngredient = {
  id: number;
  ingredient: Ingredient;
  serving: number;
  calorie: Calorie;
  totalCalories: number;
};

export type IngredientTypes = Ingredient | Ingredient[] | undefined;

export type IngredientResponse = {
  ingredients: Ingredient[];
  calories: Calorie[];
};
