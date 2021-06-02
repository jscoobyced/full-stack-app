import React from 'react';
import ReactDOM from 'react-dom';
import './Poppins-Light.ttf';
import './index.css';
import { App } from './pages/Cooking';
import { ServiceContext } from './services/Context';
import { IngredientService } from './services/Ingredient';
import { GoogleAuthenticationHandler } from './services/Authentication/Google/google-handler';
import GoogleUserService from './services/Authentication/Google';

const ingredientService = IngredientService();
const handler = new GoogleAuthenticationHandler();
const userService = new GoogleUserService();
const { createUser } = userService;

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ ingredientService, createUser, handler }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
