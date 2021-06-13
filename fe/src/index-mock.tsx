import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/';
import { mockContext } from './services/Context/mock';
import { GoogleAuthenticationHandler } from './services/Authentication/Google/google-handler';
import './index.css';
import { I18nService } from './services/i18n';

const { ingredientService, userService, recipeService } = mockContext();
const handler = new GoogleAuthenticationHandler();
const languageService = I18nService();

ReactDOM.render(
  <React.StrictMode>
    <App
      ingredientService={ingredientService}
      handler={handler}
      userService={userService}
      recipeService={recipeService}
      languageService={languageService}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
