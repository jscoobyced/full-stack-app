import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SelectedIngredient } from '../../models/ingredients';
import { ServiceContext } from '../../services/Context';
import { mockContext } from '../../services/Context/mock';
import { mockCalories, mockIngredients } from '../../services/Ingredient/mock-data';
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
  selectIngredient: (selectedIngredient: SelectedIngredient) => void,
  saveIngredients: () => void,
}) => {
  const { selectIngredient, saveIngredients } = props;

  const onAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectIngredient(mockValue());
  }
  const onSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveIngredients();
  }

  return (
    <>
      <button onClick={onAddButtonClick} >Add</button>
      <button onClick={onSaveButtonClick} >Save</button>
    </>
  );
});

const { ingredientService, handler, userService } = mockContext();

afterAll(() => {
  jest.restoreAllMocks();
});

describe('CaloriesCalculator component', () => {

  it('can render', async () => {
    const { unmount } = render(
      <ServiceContext.Provider value={{ ingredientService, userService, handler }}>
        <CaloriesCalculator />
      </ServiceContext.Provider>);
    const listElement = screen.getByText(/This is the calories calculator/i);
    expect(listElement).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /add/i }) as HTMLButtonElement;
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
      <ServiceContext.Provider value={{ ingredientService, userService, handler }}>
        <CaloriesCalculator />
      </ServiceContext.Provider>);
    const button = screen.getByRole('button', { name: /add/i }) as HTMLButtonElement;
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

  it('can save ingredients', async () => {
    const { unmount } = render(
      <ServiceContext.Provider value={{ ingredientService, userService, handler }}>
        <CaloriesCalculator />
      </ServiceContext.Provider>);
    let button = screen.getByRole('button', { name: /add/i }) as HTMLButtonElement;
    mockValue.mockReturnValueOnce(mockSelectedIngredient);
    fireEvent.click(button);
    button = screen.getByRole('button', { name: /save/i }) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(button);
    })
    unmount();
  });

  it('fails to save ingredients', async () => {
    const failed = jest.fn();
    ingredientService.saveIngredients = (ingredients: SelectedIngredient[]): Promise<boolean> => {
      failed();
      return Promise.resolve(false);
    }
    const { unmount } = render(
      <ServiceContext.Provider value={{ ingredientService, userService, handler }}>
        <CaloriesCalculator />
      </ServiceContext.Provider>);
    let button = screen.getByRole('button', { name: /add/i }) as HTMLButtonElement;
    mockValue.mockReturnValueOnce(mockSelectedIngredient);
    fireEvent.click(button);
    button = screen.getByRole('button', { name: /save/i }) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(button);
    });
    expect(failed).toHaveBeenCalledTimes(1);
    unmount();
  });

});
