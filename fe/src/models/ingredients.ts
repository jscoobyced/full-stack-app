import { BaseEntity, BaseEntityWithName, EntityWithCategory } from './common';

// Category
export type Category = BaseEntityWithName;

// Unit
export type Unit = EntityWithCategory & { symbol: string };

// Calories and Conversions
export type Calorie = BaseEntity & {
  unit: Unit;
  serving: number;
  calories: number;
};

export type Conversion = BaseEntity & {
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
