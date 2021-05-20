// Base
export type Category = { categoryId: number; name: string };
export type BaseModel = { id: number; name: string; category: Category };

// Unit
export type Unit = BaseModel & { symbol: string };

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
export type Ingredient = BaseModel & {
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

type ServiceType = void | number | string | IngredientTypes;

export type ErrorData = { code?: number; message?: string } | undefined;

export type ServiceResponse = { data: ServiceType; error?: ErrorData };

export type ControllerResponse = { data?: unknown; error?: ErrorData };
