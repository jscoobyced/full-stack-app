import { calculateAllCalories, calculateCalories } from ".";
import { SelectedIngredient } from "..";
import { mockIngredientWithConversion, mockIngredientWithoutConversion, mockSecondUnit, mockThirdUnit, mockUnit } from "../Ingredient/mock-data";


describe('calculateCalories', () => {

  it('returns 0 for undefined ingredient', () => {
    const calories = calculateCalories(undefined as unknown as SelectedIngredient);
    expect(calories).toEqual(0);
  });

  it('returns correct calories when unit is baseCalorie', () => {
    const selectedIngredient: SelectedIngredient = {
      ingredient: mockIngredientWithoutConversion,
      unit: mockUnit,
      serving: 10,
      totalCalories: 0,
    };
    const calories = calculateCalories(selectedIngredient);
    expect(calories).toEqual(50);
  });

  it('returns correct calories when unit is converted', () => {
    const selectedIngredient: SelectedIngredient = {
      ingredient: mockIngredientWithConversion,
      unit: mockSecondUnit,
      serving: 10,
      totalCalories: 0,
    };
    const calories = calculateCalories(selectedIngredient);
    expect(calories).toEqual(150);
  });

  it('returns 0 for no unit found ingredient', () => {
    const selectedIngredient: SelectedIngredient = {
      ingredient: mockIngredientWithoutConversion,
      unit: mockSecondUnit,
      serving: 10,
      totalCalories: 0,
    }
    const calories = calculateCalories(selectedIngredient);
    expect(calories).toEqual(0);
  });


  it('returns 0 for no unit filtered ingredient', () => {
    const selectedIngredient: SelectedIngredient = {
      ingredient: mockIngredientWithConversion,
      unit: mockThirdUnit,
      serving: 10,
      totalCalories: 0,
    }
    const calories = calculateCalories(selectedIngredient);
    expect(calories).toEqual(0);
  });

});

describe('calculateAllCalories', () => {

  it('returns 0 for undefined ingredient', () => {
    const calories = calculateAllCalories(undefined as unknown as SelectedIngredient[]);
    expect(calories).toEqual(0);
  });

  it('returns 0 for empty list of ingredient', () => {
    const calories = calculateAllCalories([] as SelectedIngredient[]);
    expect(calories).toEqual(0);
  });

  it('returns correct calories for a list of selected ingredient', () => {
    const selectedIngredient: SelectedIngredient = {
      ingredient: mockIngredientWithConversion,
      unit: mockSecondUnit,
      serving: 10,
      totalCalories: 0,
    };
    const calories = calculateAllCalories([selectedIngredient, selectedIngredient]);
    expect(calories).toEqual(300);
  });
});
