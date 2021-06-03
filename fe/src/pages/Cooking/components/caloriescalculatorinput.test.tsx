import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SelectedIngredient } from '../../../models/ingredients';
import { ServiceContext } from '../../../services/Context';
import CaloriesCalculatorInput from './caloriescalculatorinput';
import { mockCalories, mockIngredients } from '../../../services/Ingredient/mock-data';
import { MockIngredientService } from '../../../services/Ingredient/mock';
import { mockContext } from '../../../services/Context/mock';

const configuration = MockIngredientService();
const { handler, userService } = mockContext();

const expectedIngredient: SelectedIngredient = {
  id: 0,
  ingredient: mockIngredients[1],
  calorie: mockCalories[2],
  serving: 10,
  totalCalories: 200,
};


describe('Main component', () => {
  it('can render the options', async () => {
    const selectIngredient = jest.fn();
    const { unmount, getByRole } = render(<ServiceContext.Provider value={{ ingredientService: configuration, userService, handler }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    await waitFor(() => {
      const ingredientSelect = getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
      expect(ingredientSelect.options.length).toEqual(mockIngredients.length + 1);
    }, { interval: 100, timeout: 1000 });
    const unitSelect = getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    expect(unitSelect.options.length).toEqual(1);
    unmount();
  });

  it('can set the options', async () => {
    const selectIngredient = jest.fn().mockImplementation(() => expectedIngredient);
    const { unmount } = render(<ServiceContext.Provider value={{ ingredientService: configuration, userService, handler }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    let ingredientSelect = {} as HTMLSelectElement;
    await waitFor(() => {
      ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
    }, { interval: 100, timeout: 1000 });
    fireEvent.change(ingredientSelect, { target: { value: 2 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    fireEvent.change(unitSelect, { target: { value: 3 } });
    const quantity = screen.getByLabelText('quantity') as HTMLInputElement;
    fireEvent.change(quantity, { target: { value: 10 } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(selectIngredient).toHaveBeenCalledWith(expectedIngredient);
    unmount();
  });

  it('can select unknown ingredient', async () => {
    const selectIngredient = jest.fn().mockImplementation(() => expectedIngredient);
    const { unmount } = render(<ServiceContext.Provider value={{ ingredientService: configuration, userService, handler }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    let ingredientSelect = {} as HTMLSelectElement;
    await waitFor(() => {
      ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
    }, { interval: 100, timeout: 1000 });
    fireEvent.change(ingredientSelect, { target: { value: 20 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    expect(unitSelect).toBeDisabled();
    unmount();
  });

  it('can select ingredient with no unit found', async () => {
    const _selectedIngredient: SelectedIngredient = {
      id: 0,
      ingredient: mockIngredients[1],
      calorie: mockCalories[1],
      serving: 10,
      totalCalories: 200,
    };
    const selectIngredient = jest.fn().mockImplementation(() => _selectedIngredient);
    const { unmount } = render(<ServiceContext.Provider value={{ ingredientService: configuration, userService, handler }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    let ingredientSelect = {} as HTMLSelectElement;
    await waitFor(() => {
      ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
    }, { interval: 100, timeout: 1000 });
    fireEvent.change(ingredientSelect, { target: { value: 2 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    fireEvent.change(unitSelect, { target: { value: 20 } });
    const quantity = screen.getByLabelText('quantity') as HTMLInputElement;
    fireEvent.change(quantity, { target: { value: 10 } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(selectIngredient).toHaveBeenCalledTimes(0);
    unmount();
  });
});
