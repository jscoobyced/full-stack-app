import { Ingredient, Unit, Category, Calorie, SelectedIngredient, Recipe } from "../../models/ingredients";

const mockIngredientCategories: Category[] = [{
  id: 0,
  name: 'Powder'
}, {
  id: 1,
  name: 'Liquid'
}];


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
  }, {
    id: 4,
    name: 'Tea spoon',
    symbol: 'tsp',
    category: mockUnitCategories[0],
  }, {
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
  },
  {
    id: 2,
    name: 'Rice Flour',
    category: mockIngredientCategories[0],
  }, {
    id: 3,
    name: 'Milk',
    category: mockIngredientCategories[1],
  }, {
    id: 4,
    name: 'Egg',
    category: mockIngredientCategories[1],
  },
];

export const mockCalories: Calorie[] = [
  {
    id: 1,
    ingredientId: 1,
    unit: mockUnits[0],
    serving: 1,
    calories: 100,
  },
  {
    id: 2,
    ingredientId: 1,
    unit: mockUnits[1],
    serving: 1,
    calories: 10,
  },
  {
    id: 3,
    ingredientId: 2,
    unit: mockUnits[2],
    serving: 1,
    calories: 20,
  },
  {
    id: 4,
    ingredientId: 2,
    unit: mockUnits[3],
    serving: 1,
    calories: 50,
  },
  {
    id: 5,
    ingredientId: 3,
    unit: mockUnits[4],
    serving: 1,
    calories: 20,
  },
  {
    id: 6,
    ingredientId: 3,
    unit: mockUnits[5],
    serving: 1,
    calories: 60,
  },
];

export const mockSelectedIngredients: SelectedIngredient[] = [{
  id: 1,
  ingredient: mockIngredients[1],
  calorie: mockCalories[1],
  serving: 1,
  totalCalories: 100,
}, {
  id: 2,
  ingredient: mockIngredients[2],
  calorie: mockCalories[3],
  serving: 15,
  totalCalories: 65,
}];

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Recipe 1',
    ingredients: mockSelectedIngredients,
    uid: '123456',
  },
  {
    id: 2,
    name: 'Recipe 2',
    ingredients: mockSelectedIngredients.concat(mockSelectedIngredients),
    uid: '123456',
  },
];
