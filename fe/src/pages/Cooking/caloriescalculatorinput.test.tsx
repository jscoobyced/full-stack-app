import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SelectedIngredient } from '../../models/ingredients';
import { ServiceContext } from '../../services/Context';
import CaloriesCalculatorInput from './caloriescalculatorinput';
import { mockCalories, mockIngredients } from '../../services/Ingredient/mock-data';
import { MockIngredientService } from '../../services/Ingredient/mock';
import { mockContext } from '../../services/Context/mock';
import { newSecureUser } from '../../models/user';
import { IRecipeService } from '../../services/Recipe';

const configuration = MockIngredientService();
const { handler, userService, recipeService } = mockContext();

const expectedIngredient: SelectedIngredient = {
  id: 0,
  ingredient: mockIngredients[1],
  calorie: mockCalories[2],
  serving: 10,
  totalCalories: 200,
};

const mockUser = newSecureUser().user;

const saveIngredients = jest.fn();
const selectIngredient = jest.fn();
const replaceSelectedIngredients = jest.fn();

const setupTest = async (customSelectedIngredient?: SelectedIngredient, _recipeService?: IRecipeService) => {
  const _selectIngredient = jest.fn().mockImplementation(() => customSelectedIngredient ?? expectedIngredient);
  const { unmount } = render(<ServiceContext.Provider value={{
    ingredientService: configuration,
    userService,
    handler,
    recipeService: (_recipeService ?? recipeService)
  }}>
    <CaloriesCalculatorInput
      selectIngredient={_selectIngredient}
      canSave={false}
      saveIngredients={saveIngredients}
      user={mockUser}
      replaceSelectedIngredients={replaceSelectedIngredients} />
  </ServiceContext.Provider>);
  let ingredientSelect = {} as HTMLSelectElement;
  await waitFor(() => {
    ingredientSelect = screen.getByRole('combobox', { name: /ingredient/i }) as HTMLSelectElement;
  }, { interval: 100, timeout: 1000 });

  return {
    _selectIngredient,
    unmount,
    ingredientSelect,
  };
};

afterEach(() => {
  mockUser.referenceId = '123456';
});

describe('Main component', () => {
  it('can render the options', async () => {
    const { unmount, getByRole } = render(<ServiceContext.Provider value={{ ingredientService: configuration, userService, handler, recipeService }}>
      <CaloriesCalculatorInput
        selectIngredient={selectIngredient}
        canSave={false}
        saveIngredients={saveIngredients}
        user={mockUser}
        replaceSelectedIngredients={replaceSelectedIngredients} />
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
    const { unmount, ingredientSelect, _selectIngredient } = await setupTest();
    fireEvent.change(ingredientSelect, { target: { value: 2 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    fireEvent.change(unitSelect, { target: { value: 3 } });
    const quantity = screen.getByLabelText('quantity') as HTMLInputElement;
    fireEvent.change(quantity, { target: { value: 10 } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(_selectIngredient).toHaveBeenCalledWith(expectedIngredient);
    unmount();
  });

  it('can select unknown ingredient', async () => {
    const { unmount, ingredientSelect } = await setupTest();
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
    const { unmount, ingredientSelect, _selectIngredient } = await setupTest(_selectedIngredient);
    fireEvent.change(ingredientSelect, { target: { value: 2 } });
    const unitSelect = screen.getByRole('combobox', { name: /unit/i }) as HTMLSelectElement;
    fireEvent.change(unitSelect, { target: { value: 20 } });
    const quantity = screen.getByLabelText('quantity') as HTMLInputElement;
    fireEvent.change(quantity, { target: { value: 10 } });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(_selectIngredient).toHaveBeenCalledTimes(0);
    unmount();
  });

  it('can show the save button', async () => {
    const _saveIngredients = jest.fn();
    const { unmount } = render(<ServiceContext.Provider value={{ ingredientService: configuration, userService, handler, recipeService }}>
      <CaloriesCalculatorInput
        selectIngredient={selectIngredient}
        canSave={true}
        saveIngredients={_saveIngredients}
        user={mockUser}
        replaceSelectedIngredients={replaceSelectedIngredients} />
    </ServiceContext.Provider>);
    let canSaveButton = {} as HTMLButtonElement;
    await waitFor(() => {
      canSaveButton = screen.getByRole('button', { name: /save/i }) as HTMLButtonElement;
    });
    let recipeName = {} as HTMLInputElement;
    await waitFor(() => {
      recipeName = screen.getByLabelText(/recipe-name/i) as HTMLInputElement;
    });
    expect(recipeName).toBeDefined();
    const myRecipe = 'My recipe';
    fireEvent.change(recipeName, { target: { value: myRecipe } });
    expect(canSaveButton).toBeDefined();
    fireEvent.click(canSaveButton);
    expect(_saveIngredients).toHaveBeenCalledTimes(1);
    expect(_saveIngredients).toHaveBeenCalledWith(myRecipe);
    unmount();
  });

  it('can select recipe', async () => {
    const { unmount, ingredientSelect } = await setupTest();
    fireEvent.change(ingredientSelect, { target: { value: 20 } });
    const recipeSelect = screen.getByRole('combobox', { name: /recipes/i }) as HTMLSelectElement;
    fireEvent.change(recipeSelect, { target: { value: 1 } });
    unmount();
  });

  it('does not enable recipe list when no recipe', async () => {
    const getRecipes = jest.fn().mockImplementation(() => {
      return Promise.resolve({ data: [] });
    });
    const _recipeService: IRecipeService = {
      getRecipes,
      saveRecipe: recipeService.saveRecipe
    };
    const { unmount } = await setupTest(undefined, _recipeService);
    const recipeSelect = screen.getByRole('combobox', { name: /recipes/i }) as HTMLSelectElement;
    fireEvent.change(recipeSelect, { target: { value: 1 } });
    expect(recipeSelect).toBeDisabled();
    unmount();
  });

});
