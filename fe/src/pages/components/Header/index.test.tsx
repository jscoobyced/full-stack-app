import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '.';
import { Language } from '../../../models/common';
import { ServiceContext } from '../../../services/Context';
import { mockContext } from '../../../services/Context/mock';
import { I18nService } from '../../../services/i18n';
import { English, French, Thai } from '../../../services/i18n/language';

const { ingredientService, handler, userService, recipeService, language, setLanguage } = mockContext();
const languageService = I18nService();

const createHeader = (_setLanguage: (language: Language) => void, _language?: Language) => {
  const lang = !!_language ? _language : language;
  return render(
    <ServiceContext.Provider value={
      {
        ingredientService,
        userService,
        handler,
        recipeService,
        getTranslations: () => languageService.getTranslations(lang),
        language: lang,
        setLanguage: _setLanguage
      }}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>);
    </ServiceContext.Provider>);
}

describe('Main component', () => {
  it('can render default components', async () => {
    const { unmount, getByText } = createHeader(setLanguage);
    const title = getByText(English.Title);
    expect(title).toBeInTheDocument();
    const frenchButton = getByText('FR');
    fireEvent.click(frenchButton);
    const thaiButton = getByText('TH');
    fireEvent.click(thaiButton);
    unmount();
  });

  it('can start in French language', async () => {
    const { unmount, getByText } = createHeader(setLanguage, Language.French);
    const title = getByText(French.Title);
    expect(title).toBeInTheDocument();
    unmount();
  });

  it('can start in Thai language', async () => {
    const { unmount, getByText } = createHeader(setLanguage, Language.Thai);
    const title = getByText(Thai.Title);
    expect(title).toBeInTheDocument();
    unmount();
  });

  it('can change language', async () => {
    const _setLanguage = jest.fn();
    const { unmount, getByText } = createHeader(_setLanguage);
    const frenchButton = getByText('FR');
    fireEvent.click(frenchButton);
    expect(_setLanguage).toHaveBeenCalledTimes(1);
    expect(_setLanguage).toHaveBeenCalledWith(Language.French);
    const englishButton = getByText('EN');
    fireEvent.click(englishButton);
    expect(_setLanguage).toHaveBeenCalledWith(Language.English);
    unmount();
  });
});
