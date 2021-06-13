import { Language } from "../../models/common";
import { LanguageContent, English, French } from "./language";

export type LanguageService = {
  getTranslations: (language: Language) => LanguageContent,
};

export const I18nService = (): LanguageService => {

  const getTranslations = (language: Language): LanguageContent => {
    if (language === Language.French) {
      return French
    }
    // Default to English
    return English;
  };

  return {
    getTranslations
  };
};
