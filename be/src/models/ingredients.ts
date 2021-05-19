// Unit
export type UnitCategory = { categoryId: number; name: string };
export type Unit = { unitId: number; category: UnitCategory; name: string; symbol: string };

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
export type IngredientCategory = { categoryId: number; name: string };

export type Ingredient = {
  ingredientId: number;
  category: IngredientCategory;
  name: string;
  baseCalorie: Calorie;
  conversions?: Conversion[];
};

export type SelectedIngredient = {
  ingredient: Ingredient;
  unit: Unit;
  serving: number;
  totalCalories: number;
};

export type IngredientTypes = Ingredient | Ingredient[] | undefined;
