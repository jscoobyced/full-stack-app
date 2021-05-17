import { render, screen } from '@testing-library/react';
import { SelectedIngredient } from '../../../services';
import { mockIngredients, mockUnits } from '../../../services/Configuration/mock';
import { CaloriesCalculatorOutput } from './caloriescalculatoroutput';

describe('CaloriesCalculatorOutput component', () => {
  it('can render with no ingredient', () => {
    const { unmount } = render(
      <CaloriesCalculatorOutput selectedIngredients={[]} totalCalories={0} />);
    const listElement = screen.getByText(/Total calories/i);
    expect(listElement).toBeInTheDocument();
    unmount();
  });

  it('can render with some ingredient', () => {
    const ingredients: SelectedIngredient[] = [{
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      quantity: 5
    }, {
      ingredient: mockIngredients[2],
      unit: mockUnits[1],
      quantity: 10
    },]
    const { unmount } = render(
      <CaloriesCalculatorOutput selectedIngredients={ingredients} totalCalories={0} />);
    const options = screen.getByRole('list') as HTMLUListElement;
    expect(options).toBeInTheDocument();
    expect(options.children.length).toEqual(ingredients.length + 1);
    unmount();
  });
});
