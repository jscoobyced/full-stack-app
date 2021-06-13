import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ControllerResponse } from '../../models/common';
import { Recipe, SelectedIngredient } from '../../models/ingredients';
import { newSecureUser, SecureUser, toSecureUser, User } from '../../models/user';
import { ServiceContext } from '../../services/Context';
import { mockContext } from '../../services/Context/mock';
import { English } from '../../services/i18n/language';
import { mockCalories, mockIngredients } from '../../services/Ingredient/mock-data';
import { CaloriesCalculator } from './caloriescalculator';

const mockSelectedIngredient: SelectedIngredient = {
  id: Math.round(new Date().getTime() % 10000),
  ingredient: mockIngredients[0],
  calorie: mockCalories[0],
  serving: 0,
  totalCalories: 10,
};

const user: SecureUser = toSecureUser({
  id: 0,
  name: '',
  email: '',
  firstName: '',
  lastName: '',
  referenceId: '123456'
}, '', '', 0, 0);

const mockValue = jest.fn();
const mockSelectRecipe = jest.fn();

jest.mock('./caloriescalculatorinput', () => (props: {
  selectIngredient: (selectedIngredient: SelectedIngredient) => void,
  saveIngredients: () => void,
  user: User,
  replaceSelectedIngredients: (selectedIngredients: SelectedIngredient[]) => void,
}) => {
  const { selectIngredient, saveIngredients, replaceSelectedIngredients } = props;

  const onAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    selectIngredient(mockValue());
  }

  const onSaveButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveIngredients();
  }

  const onRecipeButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mockSelectRecipe();
    replaceSelectedIngredients([]);
  }

  return (
    <>
      <button onClick={onAddButtonClick} >Add</button>
      <button onClick={onSaveButtonClick} >Save</button>
      <button onClick={onRecipeButtonClick} >Recipe</button>
    </>
  );
});

const { ingredientService, handler, userService, recipeService, getTranslations, language, setLanguage } = mockContext();

afterAll(() => {
  jest.restoreAllMocks();
});

const setupTest = (user?: SecureUser) => {
  return render(
    <ServiceContext.Provider
      value={{ ingredientService, userService, handler, recipeService, getTranslations, language, setLanguage }}>
      <CaloriesCalculator
        user={user ?? newSecureUser()}
        translations={English} />
    </ServiceContext.Provider>);
}

describe('CaloriesCalculator component', () => {

  it('can render', async () => {
    const { unmount } = setupTest();
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
    const { unmount } = setupTest();
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
    const success = jest.fn();
    recipeService.saveRecipe = (_recipe: Recipe): Promise<ControllerResponse> => {
      success();
      return Promise.resolve({
        data: true,
      });
    };
    const { unmount } = setupTest(user);
    let button = screen.getByRole('button', { name: /add/i }) as HTMLButtonElement;
    mockValue.mockReturnValueOnce(mockSelectedIngredient);
    fireEvent.click(button);
    button = screen.getByRole('button', { name: /save/i }) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(button);
    })
    expect(success).toHaveBeenCalledTimes(1);
    unmount();
  });

  it('fail to save ingredients due to not logged-in', async () => {
    const _user: SecureUser = toSecureUser({
      id: 0,
      name: '',
      email: '',
      firstName: '',
      lastName: '',
      referenceId: undefined
    }, '', '', 0, 0);
    const failed = jest.fn();
    recipeService.saveRecipe = (_recipe: Recipe): Promise<ControllerResponse> => {
      failed();
      return Promise.resolve({
        error: {
          message: 'blabla',
        }
      });
    };
    const { unmount } = setupTest(_user);
    let button = screen.getByRole('button', { name: /add/i }) as HTMLButtonElement;
    mockValue.mockReturnValueOnce(mockSelectedIngredient);
    fireEvent.click(button);
    button = screen.getByRole('button', { name: /save/i }) as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(button);
    });
    expect(failed).toHaveBeenCalledTimes(0);
    unmount();
  });

  it('fails to save ingredients', async () => {
    const failed = jest.fn();
    recipeService.saveRecipe = (_recipe: Recipe): Promise<ControllerResponse> => {
      failed();
      return Promise.resolve({
        error: {
          message: 'tototo',
        }
      });
    };
    const { unmount } = setupTest(user);
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

  it('fails to save ingredients unexpectedly', async () => {
    const failed = jest.fn();
    recipeService.saveRecipe = (_recipe: Recipe): Promise<ControllerResponse> => {
      failed();
      return Promise.resolve({});
    };
    const { unmount } = setupTest(user);
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

  it('can select recipe', async () => {
    const { unmount } = setupTest(user);
    const button = screen.getByRole('button', { name: /recipe/i }) as HTMLButtonElement;
    fireEvent.click(button);
    expect(mockSelectRecipe).toHaveBeenCalledTimes(1);
    unmount();
  });
});
