import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/Cooking';
import { MockIngredientService } from './services/Ingredient/mock';
import { ServiceContext } from './services/Context';
import './index.css';

const ingredientService = MockIngredientService();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ ingredientService }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
