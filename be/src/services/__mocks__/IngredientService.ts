import { ServiceResponse } from '../../models/common';
import { Ingredient, Category, Unit } from '../../models/ingredients';

const mockIngredientCategories: Category[] = [
  {
    id: 0,
    name: 'Powder',
  },
  {
    id: 1,
    name: 'Liquid',
  },
];

const mockUnitCategories: Category[] = [
  {
    id: 1,
    name: 'Volume',
  },
  {
    id: 2,
    name: 'Mass',
  },
];

export const mockUnits: Unit[] = [
  {
    id: 1,
    name: 'Milliliter',
    symbol: 'mL',
    category: mockUnitCategories[0],
  },
  {
    id: 2,
    name: 'Cup',
    symbol: 'cup',
    category: mockUnitCategories[0],
  },
  {
    id: 3,
    name: 'Table spoon',
    symbol: 'tbsp',
    category: mockUnitCategories[0],
  },
  {
    id: 4,
    name: 'Tea spoon',
    symbol: 'tsp',
    category: mockUnitCategories[0],
  },
  {
    id: 5,
    name: 'Milligram',
    symbol: 'mg',
    category: mockUnitCategories[1],
  },
  {
    id: 6,
    name: 'Gram',
    symbol: 'g',
    category: mockUnitCategories[1],
  },
  {
    id: 7,
    name: 'Pound',
    symbol: 'lb',
    category: mockUnitCategories[1],
  },
  {
    id: 8,
    name: 'piece',
    symbol: 'p',
    category: mockUnitCategories[1],
  },
];

export const mockIngredients: Ingredient[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 0,
    name: 'Volume',
  },
  name: 'Cup',
  symbol: 'cup',
  id: 0,
};

export const mockSecondUnit = {
  category: {
    id: 1,
    name: 'Mass',
  },
  name: 'Gram',
  symbol: 'gram',
  id: 1,
};

export const mockThirdUnit = {
  category: {
    id: 2,
    name: 'Weird',
  },
  name: 'Glop',
  symbol: 'glop',
  id: 2,
};

export const mockIngredientWithoutConversion = {
  id: 0,
  name: 'Ingredient X',
  category: {
    id: 0,
    name: 'Solid',
  },
  baseCalorie: {
    calories: 10,
    serving: 2,
    unit: mockUnit,
  },
};

export const mockIngredientWithConversion = {
  id: 0,
  name: 'Ingredient X',
  category: {
    id: 0,
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
