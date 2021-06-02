import { render } from '@testing-library/react';
import { AUTHOR, COPYRIGHT, RELEASE_YEAR } from '../../../config/constants';
import dateUtil from '../../../utils/dateUtil';
import { Footer } from './footer';

describe('Footer', () => {
  it('can render default year', async () => {
    const { unmount, container } = render(<Footer />);
    const footers = container.getElementsByTagName('footer');
    expect(footers).toHaveLength(1);
    const footer = footers[0];
    expect(footer).toBeInTheDocument();
    const footerText = footer.innerHTML;
    expect(footerText).toBeDefined();
    expect(footerText.indexOf(COPYRIGHT)).toBeGreaterThanOrEqual(0);
    expect(footerText.indexOf(`${RELEASE_YEAR}`)).toBeGreaterThanOrEqual(0);
    expect(footerText.indexOf(AUTHOR) > 0).toBeTruthy();
    unmount();
  });

  it('can render footer with different year', async () => {
    const nextTenYear = new Date().getFullYear() + 10;
    dateUtil.getCurrentDate = jest.fn().mockReturnValue(new Date(nextTenYear, 1, 1));
    const { unmount, container } = render(<Footer />);
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
