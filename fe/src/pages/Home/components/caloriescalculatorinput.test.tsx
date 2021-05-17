import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import { SelectedIngredient } from '../../../services';
import { MockConfigurationService, mockIngredients, mockUnits } from '../../../services/Configuration/mock';
import { ServiceContext } from '../../../services/Context';
import CaloriesCalculatorInput from './caloriescalculatorinput';

const configuration = MockConfigurationService();

describe('Main component', () => {
  it('can render the options', async () => {
    const selectIngredient = jest.fn();
    const { unmount } = render(<ServiceContext.Provider value={{ configuration }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    await waitFor(() => {
      const ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
      // Ingredients list + empty option
      expect(ingredientSelect.options.length).toEqual(mockIngredients.length + 1);
      const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
      // Ingredients list + empty option
      expect(unitSelect.options.length).toEqual(mockUnits.length + 1);
    }, { interval: 100, timeout: 1000 });
    unmount();
  });

  it('can set the options', async () => {
    const expected: SelectedIngredient = {
      ingredient: mockIngredients[1],
      quantity: 10,
      unit: mockUnits[1],
    };
    const selectIngredient = jest.fn();
    const { unmount } = render(<ServiceContext.Provider value={{ configuration }}>
      <CaloriesCalculatorInput selectIngredient={selectIngredient} />
    </ServiceContext.Provider>);
    await waitFor(() => {
      const ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
      fireEvent.change(ingredientSelect, { target: { value: 2 } });
      const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
      fireEvent.change(unitSelect, { target: { value: 2 } });
      const quantity = screen.getByLabelText('quantity') as HTMLInputElement;
      fireEvent.change(quantity, { target: { value: 10 } });
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(selectIngredient).toHaveBeenCalledWith(expected);
    }, { interval: 100, timeout: 1000 });
    unmount();
  });
});
