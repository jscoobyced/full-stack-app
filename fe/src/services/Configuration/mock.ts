import { ConfigurationResponse, IConfiguration } from ".";
import { Ingredient, IngredientCategory, IngredientData, Unit, UnitCategory, UnitData } from "..";

const mockIngredientCategories: IngredientCategory[] = [{
  categoryId: 0,
  name: 'Solids'
}, {
  categoryId: 1,
  name: 'Liquids'
}];

export const mockIngredients: Ingredient[] = [
  {
    ingredientId: 1,
    name: 'Bread Flour',
    category: mockIngredientCategories[0],
    calories: 100,
  },
  {
    ingredientId: 2,
    name: 'Cake Flour',
    category: mockIngredientCategories[0],
    calories: 110,
  },
  {
    ingredientId: 3,
    name: 'Multi-Purpose Flour',
    category: mockIngredientCategories[0],
    calories: 120,
  }, {
    ingredientId: 4,
    name: 'Instant Yeast',
    category: mockIngredientCategories[0],
    calories: 50,
  }, {
    ingredientId: 5,
    name: 'Water',
    category: mockIngredientCategories[1],
    calories: 0,
  }, {
    ingredientId: 6,
    name: 'Milk',
    category: mockIngredientCategories[1],
    calories: 90,
  }, {
    ingredientId: 7,
    name: 'Vanilla Extract',
    category: mockIngredientCategories[1],
    calories: 200,
  }, {
    ingredientId: 8,
    name: 'Lemon juice',
    category: mockIngredientCategories[1],
    calories: 75,
  },
];

export const mockIngredientResponse: IngredientData = {
  categories: mockIngredientCategories,
  ingredients: mockIngredients,
};

const mockUnitCategories: UnitCategory[] = [
  {
    categoryId: 1,
    name: 'Volume',
  },
  {
    categoryId: 2,
    name: 'Mass',
  },
];

export const mockUnits: Unit[] = [
  {
    unitId: 1,
    name: 'Milliliter',
    symbol: 'mL',
    category: mockUnitCategories[0],
  },
  {
    unitId: 2,
    name: 'Cup',
    symbol: 'cup',
    category: mockUnitCategories[0],
  },
  {
    unitId: 3,
    name: 'Table spoon',
    symbol: 'tbsp',
    category: mockUnitCategories[0],
  }, {
    unitId: 4,
    name: 'Tea spoon',
    symbol: 'tsp',
    category: mockUnitCategories[0],
  }, {
    unitId: 5,
    name: 'Milligram',
    symbol: 'mg',
    category: mockUnitCategories[1],
  },
  {
    unitId: 6,
    name: 'Gram',
    symbol: 'g',
    category: mockUnitCategories[1],
  },
  {
    unitId: 7,
    name: 'Pound',
    symbol: 'lb',
    category: mockUnitCategories[1],
  },
];

export const mockUnitResponse: UnitData = {
  categories: mockUnitCategories,
  units: mockUnits,
};

export const mockConfigurationResponse: ConfigurationResponse = {
  ingredients: mockIngredientResponse,
  units: mockUnitResponse,
};

export const MockConfigurationService = (): IConfiguration => {
  const getConfiguration = async (): Promise<ConfigurationResponse> => {
    return Promise.resolve(mockConfigurationResponse);
  };

  return {
    getConfiguration
  };
}