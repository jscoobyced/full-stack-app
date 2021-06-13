import { render } from '@testing-library/react';
import { AUTHOR, RELEASE_YEAR } from '../../../config/constants';
import { ServiceContext } from '../../../services/Context';
import { mockContext } from '../../../services/Context/mock';
import { English } from '../../../services/i18n/language';
import dateUtil from '../../../utils/dateUtil';
import { Footer } from './footer';

const { ingredientService, handler, userService, recipeService, getTranslations, language, setLanguage } = mockContext();

const footerSetup = () => {
  const { unmount, container } = render(
    <ServiceContext.Provider value=
      {{ ingredientService, userService, handler, recipeService, getTranslations, language, setLanguage }}>
      <Footer />
    </ServiceContext.Provider>);
  return {
    unmount,
    container,
  };
};

describe('Footer', () => {
  it('can render default year', async () => {
    const { unmount, container } = footerSetup();
    const footers = container.getElementsByTagName('footer');
    expect(footers).toHaveLength(1);
    const footer = footers[0];
    expect(footer).toBeInTheDocument();
    const footerText = footer.innerHTML;
    expect(footerText).toBeDefined();
    expect(footerText.indexOf(English.Copyright)).toBeGreaterThanOrEqual(0);
    expect(footerText.indexOf(`${RELEASE_YEAR}`)).toBeGreaterThanOrEqual(0);
    expect(footerText.indexOf(AUTHOR) > 0).toBeTruthy();
    unmount();
  });

  it('can render footer with different year', async () => {
    const nextTenYear = new Date().getFullYear() + 10;
    dateUtil.getCurrentDate = jest.fn().mockReturnValue(new Date(nextTenYear, 1, 1));
    const { unmount, container } = footerSetup();
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
