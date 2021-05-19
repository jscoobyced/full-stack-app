import { render, screen } from '@testing-library/react';
import { SelectedIngredient } from '../../../services';
import { mockIngredients, mockUnits } from '../../../services/Ingredient/mock-data';
import { CaloriesCalculatorOutput } from './caloriescalculatoroutput';

describe('CaloriesCalculatorOutput component', () => {
  it('can render with no ingredient', () => {
    const { unmount } = render(
      <CaloriesCalculatorOutput selectedIngredients={[]} totalCalories={0} />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('hide');
    unmount();
  });

  it('can render with some ingredient', () => {
    const ingredients: SelectedIngredient[] = [{
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      serving: 5,
      totalCalories: 0
    }, {
      ingredient: mockIngredients[2],
      unit: mockUnits[1],
      serving: 10,
      totalCalories: 0,
    },]
    const { unmount } = render(
      <CaloriesCalculatorOutput selectedIngredients={ingredients} totalCalories={0} />);
    const table = screen.getByRole('table');
    expect(table.children.length).toEqual(ingredients.length + 1);
    unmount();
  });
});
