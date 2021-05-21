import { BaseEntity, EntityWithCategory } from './common';

// Category
export type Category = BaseEntity;

// Unit
export type Unit = EntityWithCategory & { symbol: string };

// Calories and Conversions
export type Calorie = {
  unit: Unit;
  serving: number;
  calories: number;
};

export type Conversion = {
  fromUnit: Unit;
  multiplier: number;
};

// Ingredients
export type Ingredient = EntityWithCategory & {
  baseCalorie: Calorie;
  conversions?: Conversion[];
};

export type SelectedIngredient = {
  id: number;
  ingredient: Ingredient;
  unit: Unit;
  serving: number;
  totalCalories: number;
};

export type IngredientTypes = Ingredient | Ingredient[] | undefined;
