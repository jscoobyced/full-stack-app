import { render, screen } from '@testing-library/react';
import { CaloriesCalculator } from './caloriescalculator';

jest.mock('./caloriescalculatorinput', () => () => 'mocked');

afterAll(() => {
  jest.restoreAllMocks();
});


describe('CaloriesCalculator component', () => {
  it('can render', async () => {
    const { unmount } = render(
      <CaloriesCalculator />);
    const listElement = screen.getByText(/This is the calories calculator/i);
    expect(listElement).toBeInTheDocument();
    unmount();
  })
})
