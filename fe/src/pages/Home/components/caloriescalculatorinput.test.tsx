import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Ingredient, SelectedIngredient, Unit } from '../../../services';
import { IConfiguration } from '../../../services/Configuration';
import { MockConfigurationService, mockIngredients, mockIngredientWithoutConversion, mockUnits } from '../../../services/Configuration/mock';
import { ServiceContext } from '../../../services/Context';
import CaloriesCalculatorInput from './caloriescalculatorinput';

const configuration = MockConfigurationService();

const configurationWithoutConversion = (): IConfiguration => {
  const getConfiguration = async (): Promise<Ingredient[]> => {
    return Promise.resolve([mockIngredientWithoutConversion]);
  };

  return {
    getConfiguration
  };
};

describe('Main component', () => {
  it('can render the options', async () => {
    const selectIngredient = jest.fn();
    const { unmount, getByRole } = render(<ServiceContext.Provider value={{ configuration }}>
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
    const expected: SelectedIngredient = {
      ingredient: mockIngredients[1],
      serving: 10,
      unit: mockUnits[1],
      totalCalories: 3660,
    };
    const selectIngredient = jest.fn().mockImplementation(() => expected);
    const { unmount } = render(<ServiceContext.Provider value={{ configuration }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    let ingredientSelect = {} as HTMLSelectElement;
    await waitFor(() => {
      ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
    }, { interval: 100, timeout: 1000 });
    fireEvent.change(ingredientSelect, { target: { value: 2 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    fireEvent.change(unitSelect, { target: { value: 2 } });
    const quantity = screen.getByLabelText('quantity') as HTMLInputElement;
    fireEvent.change(quantity, { target: { value: 10 } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(selectIngredient).toHaveBeenCalledWith(expected);
    unmount();
  });

  it('can select unknown ingredient', async () => {
    const expected: SelectedIngredient = {
      ingredient: mockIngredients[1],
      serving: 10,
      unit: mockUnits[1],
      totalCalories: 3660,
    };
    const selectIngredient = jest.fn().mockImplementation(() => expected);
    const { unmount } = render(<ServiceContext.Provider value={{ configuration }}>
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

  it('can select ingredient with no conversion', async () => {
    const expected: SelectedIngredient = {
      ingredient: mockIngredients[1],
      serving: 10,
      unit: mockUnits[1],
      totalCalories: 3660,
    };
    const selectIngredient = jest.fn().mockImplementation(() => expected);
    const noConversionConfiguration = configurationWithoutConversion();
    const { unmount } = render(<ServiceContext.Provider value={{ configuration: noConversionConfiguration }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    let ingredientSelect = {} as HTMLSelectElement;
    await waitFor(() => {
      ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
    }, { interval: 100, timeout: 1000 });
    fireEvent.change(ingredientSelect, { target: { value: 0 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    expect(unitSelect).toBeEnabled();
    unmount();
  });

  it('can select ingredient with no unit found', async () => {
    const selectedIngredient: SelectedIngredient = {
      ingredient: mockIngredients[1],
      serving: 10,
      unit: mockUnits[1],
      totalCalories: 3660,
    };
    const expectedIngredient: SelectedIngredient = {
      ingredient: mockIngredients[1],
      serving: 10,
      unit: {} as Unit,
      totalCalories: 0,
    };
    const selectIngredient = jest.fn().mockImplementation(() => selectedIngredient);
    const { unmount } = render(<ServiceContext.Provider value={{ configuration }}>
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
    expect(selectIngredient).toHaveBeenCalledWith(expectedIngredient);
    unmount();
  });
});
