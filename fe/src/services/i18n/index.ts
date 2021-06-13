import { Language } from "../../models/common";
import { LanguageContent, English, French, Thai } from "./language";

export type LanguageService = {
  getTranslations: (language: Language) => LanguageContent,
};

export const I18nService = (): LanguageService => {

  const getTranslations = (language: Language): LanguageContent => {
    if(language === Language.French) {
      return French;
    } else if (language === Language.Thai) {
      return Thai;
    }
    return English;
  };

  return {
    getTranslations
  };
};
