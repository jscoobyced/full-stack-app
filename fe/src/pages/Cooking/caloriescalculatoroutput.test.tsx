import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedIngredient } from '../../models/ingredients';
import { English } from '../../services/i18n/language';
import { mockCalories, mockIngredients } from '../../services/Ingredient/mock-data';
import { CaloriesCalculatorOutput } from './caloriescalculatoroutput';

const removeIngredient = jest.fn();
const _mockIngredients: SelectedIngredient[] = [{
  id: 1,
  ingredient: mockIngredients[0],
  calorie: mockCalories[0],
  serving: 5,
  totalCalories: 0,
}, {
  id: 2,
  ingredient: mockIngredients[2],
  calorie: mockCalories[4],
  serving: 10,
  totalCalories: 0,
},]

beforeEach(() => {
  jest.restoreAllMocks();
});

const setupTest = (selectedIngredients: SelectedIngredient[]) => {
  return render(
    <CaloriesCalculatorOutput
      removeIngredient={removeIngredient}
      selectedIngredients={selectedIngredients}
      totalCalories={0}
      translations={English}
    />);
}

describe('CaloriesCalculatorOutput component', () => {
  it('can render with no ingredient', () => {
    const { unmount } = setupTest([]);
    const table = screen.getByRole('table');
    expect(table.className).toContain('hide');
    unmount();
  });

  it('can render with some ingredient', () => {
    const { unmount } = setupTest(_mockIngredients);
    const table = screen.getByRole('table');
    expect(table.children.length).toEqual(_mockIngredients.length + 1);
    unmount();
  });

  it('can remove ingredient', () => {
    const { unmount } = setupTest(_mockIngredients);
    const removes = screen.getAllByRole('img');
    expect(removes.length).toEqual(2);
    fireEvent.click(removes[0]);
    expect(removeIngredient).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('does not remove ingredient if more than 1 ingredient', () => {
    const ingredients: SelectedIngredient[] = _mockIngredients;
    ingredients[1].id = 1;
    const { unmount } = setupTest(ingredients);
    const removes = screen.getAllByRole('img');
    expect(removes.length).toEqual(2);
    fireEvent.click(removes[0]);
    expect(removeIngredient).toHaveBeenCalledTimes(0);
    unmount();
  });
});
