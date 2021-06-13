import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/';
import { IngredientService } from './services/Ingredient';
import { GoogleAuthenticationHandler } from './services/Authentication/Google/google-handler';
import GoogleUserService from './services/Authentication/Google';
import { RecipeService } from './services/Recipe';
import { I18nService } from './services/i18n';
import './Poppins-Light.ttf';
import './index.css';

const ingredientService = IngredientService();
const handler = new GoogleAuthenticationHandler();
const userService = new GoogleUserService();
const recipeService = RecipeService();
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
