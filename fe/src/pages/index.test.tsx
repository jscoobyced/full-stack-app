import { render, screen } from '@testing-library/react';
import { App } from '.';
import { mockContext } from '../services/Context/mock';
import { I18nService } from '../services/i18n';

jest.mock('./Cooking/caloriescalculatorinput', () => () => 'mocked');

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Main component', () => {
  const { ingredientService, handler, userService, recipeService } = mockContext();
  const languageService = I18nService();
  it('can render default components', async () => {
    const { unmount } = render(<App
      ingredientService={ingredientService}
      handler={handler}
      userService={userService}
      recipeService={recipeService}
      languageService={languageService}
    />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    unmount();
  });
});
