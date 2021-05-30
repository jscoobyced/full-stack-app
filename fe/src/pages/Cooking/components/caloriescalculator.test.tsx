import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedIngredient } from '../../../models/ingredients';
import { mockCalories, mockIngredients } from '../../../services/Ingredient/mock-data';
import { CaloriesCalculator } from './caloriescalculator';

const mockSelectedIngredient: SelectedIngredient = {
  id: Math.round(new Date().getTime() % 10000),
  ingredient: mockIngredients[0],
  calorie: mockCalories[0],
  serving: 0,
  totalCalories: 10,
};

const mockValue = jest.fn();

jest.mock('./caloriescalculatorinput', () => (props: {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void
}) => {
  const { selectIngredient } = props;

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectIngredient(mockValue());
  }

  return (
    <button onClick={onButtonClick} />
  );
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('CaloriesCalculator component', () => {

  it('can render', async () => {
    const { unmount } = render(
      <CaloriesCalculator />);
    const listElement = screen.getByText(/This is the calories calculator/i);
    expect(listElement).toBeInTheDocument();
    const button = screen.getByRole('button') as HTMLButtonElement;
    mockValue.mockReturnValueOnce(mockSelectedIngredient).mockReturnValueOnce(mockSelectedIngredient);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const table = screen.getByRole('table');
    expect(table.children.length).toEqual(3);
    unmount();
  });

  it('can remove ingredients', async () => {
    const { unmount } = render(
      <CaloriesCalculator />);
    const button = screen.getByRole('button') as HTMLButtonElement;
    mockValue.mockReturnValueOnce(mockSelectedIngredient);
    fireEvent.click(button);
    const tableBefore = screen.getByRole('table') as HTMLTableElement;
    expect(tableBefore.rows.length).toEqual(3);
    const removeButton = screen.getByRole('img');
    fireEvent.click(removeButton);
    const tableAfter = screen.getByRole('table') as HTMLTableElement;
    expect(tableAfter.rows.length).toEqual(2);
    fireEvent.click(removeButton);
    unmount();
  });

});
