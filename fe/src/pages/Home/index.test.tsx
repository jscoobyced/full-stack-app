import { render, screen } from '@testing-library/react';
import { App } from '.';
import { AUTHOR, COPYRIGHT, RELEASE_YEAR, TITLE } from '../../config/constants';
import dateUtil from '../../utils/dateUtil';

jest.mock('./components/caloriescalculatorinput', () => () => 'mocked');

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Main component', () => {
  it('can render default components', async () => {
    const { unmount, container } = render(<App />);
    const textElement = screen.getByText(TITLE);
    expect(textElement).toBeInTheDocument();
    const footers = container.getElementsByTagName('footer');
    expect(footers).toHaveLength(1);
    const footer = footers[0];
    expect(footer).toBeInTheDocument();
    const footerText = footer.innerHTML;
    expect(footerText).toBeDefined();
    expect(footerText.indexOf(COPYRIGHT) === 0).toBeTruthy();
    expect(footerText.indexOf(`${RELEASE_YEAR}`) > 0).toBeTruthy();
    expect(footerText.indexOf(AUTHOR) > 0).toBeTruthy();
    unmount();
  });

  it('can render components with different year', async () => {
    const nextTenYear = new Date().getFullYear() + 10;
    dateUtil.getCurrentDate = jest.fn().mockReturnValue(new Date(nextTenYear, 1, 1));
    const { unmount, container } = render(<App />);
    const footers = container.getElementsByTagName('footer');
    expect(footers).toHaveLength(1);
    const footer = footers[0];
    expect(footer).toBeInTheDocument();
    const footerText = footer.innerHTML;
    expect(footerText).toBeDefined();
    expect(footerText.indexOf(`${RELEASE_YEAR}-${nextTenYear}`) > 0).toBeTruthy();
    unmount();
  });

});
