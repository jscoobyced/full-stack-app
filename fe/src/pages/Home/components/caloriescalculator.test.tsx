import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedIngredient } from '../../../services';
import { mockIngredients, mockUnits } from '../../../services/Ingredient/mock-data';
import { CaloriesCalculator } from './caloriescalculator';

jest.mock('./caloriescalculatorinput', () => (props: {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void
}) => {
  const { selectIngredient } = props;

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectIngredient({
      ingredient: mockIngredients[0],
      unit: mockUnits[0],
      serving: 0,
      totalCalories: 0,
    });
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
    fireEvent.click(button);
    fireEvent.click(button);
    const table = screen.getByRole('table');
    expect(table.children.length).toEqual(3);
    unmount();
  });
});
