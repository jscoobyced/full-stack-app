import { ServiceResponse } from '../../models/common';
import { Ingredient, IngredientCategory, Unit, UnitCategory } from '../../models/ingredients';

const mockIngredientCategories: IngredientCategory[] = [
  {
    categoryId: 0,
    name: 'Powder',
  },
  {
    categoryId: 1,
    name: 'Liquid',
  },
];

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
  },
  {
    unitId: 4,
    name: 'Tea spoon',
    symbol: 'tsp',
    category: mockUnitCategories[0],
  },
  {
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
  {
    unitId: 8,
    name: 'piece',
    symbol: 'p',
    category: mockUnitCategories[1],
  },
];

export const mockIngredients: Ingredient[] = [
  {
    ingredientId: 1,
    name: 'Wheat Flour',
    category: mockIngredientCategories[0],
    baseCalorie: {
      unit: mockUnits[1],
      serving: 1,
      calories: 364,
    },
    conversions: [
      {
        fromUnit: mockUnits[2],
        multiplier: 1 / 16,
      },
      {
        fromUnit: mockUnits[5],
        multiplier: 1 / 120,
      },
    ],
  },
  {
    ingredientId: 2,
    name: 'Rice Flour',
    category: mockIngredientCategories[0],
    baseCalorie: {
      unit: mockUnits[1],
      serving: 1,
      calories: 366,
    },
    conversions: [
      {
        fromUnit: mockUnits[2],
        multiplier: 1 / 16,
      },
      {
        fromUnit: mockUnits[5],
        multiplier: 1 / 120,
      },
    ],
  },
  {
    ingredientId: 3,
    name: 'Milk',
    category: mockIngredientCategories[1],
    baseCalorie: {
      unit: mockUnits[0],
      serving: 1,
      calories: 0.44,
    },
    conversions: [
      {
        fromUnit: mockUnits[1],
        multiplier: 237,
      },
      {
        fromUnit: mockUnits[5],
        multiplier: 1,
      },
    ],
  },
];

export const mockUnit = {
  category: {
    categoryId: 0,
    name: 'Volume',
  },
  name: 'Cup',
  symbol: 'cup',
  unitId: 0,
};

export const mockSecondUnit = {
  category: {
    categoryId: 1,
    name: 'Mass',
  },
  name: 'Gram',
  symbol: 'gram',
  unitId: 1,
};

export const mockThirdUnit = {
  category: {
    categoryId: 2,
    name: 'Weird',
  },
  name: 'Glop',
  symbol: 'glop',
  unitId: 2,
};

export const mockIngredientWithoutConversion = {
  ingredientId: 0,
  name: 'Ingredient X',
  category: {
    categoryId: 0,
    name: 'Solid',
  },
  baseCalorie: {
    calories: 10,
    serving: 2,
    unit: mockUnit,
  },
};

export const mockIngredientWithConversion = {
  ingredientId: 0,
  name: 'Ingredient X',
  category: {
    categoryId: 0,
    name: 'Solid',
  },
  baseCalorie: {
    calories: 10,
    serving: 1,
    unit: mockUnit,
  },
  conversions: [
    {
      fromUnit: mockSecondUnit,
      multiplier: 1.5,
    },
  ],
};

export const getIngredients = async (): Promise<ServiceResponse> => {
  return Promise.resolve({ data: mockIngredients });
};
