import { fireEvent, render, screen } from '@testing-library/react';
import { CaloriesCalculator } from './caloriescalculator';

jest.mock('./caloriescalculatorinput');

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

  it('can remove ingredients', async () => {
    const { unmount } = render(
      <CaloriesCalculator />);
      const button = screen.getByRole('button') as HTMLButtonElement;
      fireEvent.click(button);
      const removeButton = screen.getByRole('img');
      fireEvent.click(removeButton);
      unmount();
  });
});
