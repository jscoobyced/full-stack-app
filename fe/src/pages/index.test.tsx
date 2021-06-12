import { render, screen } from '@testing-library/react';
import { App } from '.';
import { TITLE } from '../config/constants';
import { ServiceContext } from '../services/Context';
import { mockContext } from '../services/Context/mock';

jest.mock('./Cooking/caloriescalculatorinput', () => () => 'mocked');

const { ingredientService, handler, userService, recipeService } = mockContext();

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Main component', () => {
  it('can render default components', async () => {
    const { unmount } = render(<ServiceContext.Provider value={{ ingredientService, userService, handler, recipeService }}>
      <App />
    </ServiceContext.Provider>);
    const textElement = screen.getByText(TITLE);
    expect(textElement).toBeInTheDocument();
    unmount();
  });
});
