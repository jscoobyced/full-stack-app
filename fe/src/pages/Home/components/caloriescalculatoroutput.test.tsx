import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedIngredient } from '../../../models/ingredients';
import { mockIngredients, mockUnits } from '../../../services/Ingredient/mock-data';
import { CaloriesCalculatorOutput } from './caloriescalculatoroutput';

const removeIngredient = jest.fn();

beforeEach(() => {
  jest.restoreAllMocks();
})

describe('CaloriesCalculatorOutput component', () => {
  it('can render with no ingredient', () => {
    const { unmount } = render(
      <CaloriesCalculatorOutput
        removeIngredient={removeIngredient}
        selectedIngredients={[]}
        totalCalories={0} />);
    const table = screen.getByRole('table');
    expect(table.className).toContain('hide');
    unmount();
  });

  it('can render with some ingredient', () => {
    const ingredients: SelectedIngredient[] = [{
      id: 1,
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      serving: 5,
      totalCalories: 0
    }, {
      id: 2,
      ingredient: mockIngredients[2],
      unit: mockUnits[1],
      serving: 10,
      totalCalories: 0,
    },]
    const { unmount } = render(
      <CaloriesCalculatorOutput
        removeIngredient={removeIngredient}
        selectedIngredients={ingredients} totalCalories={0}
      />);
    const table = screen.getByRole('table');
    expect(table.children.length).toEqual(ingredients.length + 1);
    unmount();
  });

  it('can remove ingredient', () => {
    const ingredients: SelectedIngredient[] = [{
      id: 1,
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      serving: 5,
      totalCalories: 0
    }, {
      id: 2,
      ingredient: mockIngredients[2],
      unit: mockUnits[1],
      serving: 10,
      totalCalories: 0,
    },]
    const { unmount } = render(
      <CaloriesCalculatorOutput
        removeIngredient={removeIngredient}
        selectedIngredients={ingredients} totalCalories={0}
      />);
    const removes = screen.getAllByRole('img');
    expect(removes.length).toEqual(2);
    fireEvent.click(removes[0]);
    expect(removeIngredient).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('does not remove ingredient if more than 1 ingredient', () => {
    const ingredients: SelectedIngredient[] = [{
      id: 1,
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      serving: 5,
      totalCalories: 0
    }, {
      id: 1,
      ingredient: mockIngredients[2],
      unit: mockUnits[1],
      serving: 10,
      totalCalories: 0,
    },]
    const { unmount } = render(
      <CaloriesCalculatorOutput
        removeIngredient={removeIngredient}
        selectedIngredients={ingredients} totalCalories={0}
      />);
    const removes = screen.getAllByRole('img');
    expect(removes.length).toEqual(2);
    fireEvent.click(removes[0]);
    expect(removeIngredient).toHaveBeenCalledTimes(0);
    unmount();
  });
});
