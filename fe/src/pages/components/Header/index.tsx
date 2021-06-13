import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Language } from "../../../models/common";
import { ServiceContext } from "../../../services/Context";
import './index.css';

export const Header = () => {

  const { getTranslations, setLanguage, language } = useContext(ServiceContext);
  const translations = getTranslations();

  const setEnglish = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setLanguage(Language.English);
  }

  const setFrench = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    setLanguage(Language.French);
  }

  return (
    <header>
      <span><span
        onClick={setEnglish}
        className={(language === Language.English) ? 'lang-on' : ''}>EN</span> | <span
          onClick={setFrench}
          className={(language === Language.French) ? 'lang-on' : ''}>FR</span></span>
      <div>
        <span className='title'>{translations.Title}</span>
        <nav>
          <Link to='/'>{translations.Home}</Link>
          {' '}|{' '}
          <Link to='/calc'>{translations.CaloriesCalculator}</Link>
        </nav>
      </div>
    </header>
  );
}
