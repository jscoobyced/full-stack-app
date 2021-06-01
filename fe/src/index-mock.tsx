import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/Cooking';
import { MockIngredientService } from './services/Ingredient/mock';
import { ServiceContext } from './services/Context';
import { AuthenticationHandler } from './services/Authentication/handler';
import { newSecureUser } from './models/user';
import './index.css';

const ingredientService = MockIngredientService();
const handler = new AuthenticationHandler();
const userService = {
  createUser: (user: any) => {
    const newUser = newSecureUser();
    newUser.user.name = 'Test User';
    return newUser;
  },
};
const { createUser } = userService;

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ ingredientService, handler, createUser }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
