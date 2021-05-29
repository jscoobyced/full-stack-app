import { render, screen } from '@testing-library/react';
import { App } from '.';
import { TITLE } from '../../config/constants';

jest.mock('./components/caloriescalculatorinput', () => () => 'mocked');

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Main component', () => {
  it('can render default components', async () => {
    const { unmount } = render(<App />);
    const textElement = screen.getByText(TITLE);
    expect(textElement).toBeInTheDocument();
    unmount();
  });
});
