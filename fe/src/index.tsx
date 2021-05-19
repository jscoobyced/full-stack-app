import React from 'react';
import ReactDOM from 'react-dom';
import './Poppins-Light.ttf';
import './index.css';
import { App } from './pages/Home';
import { ServiceContext } from './services/Context';
import { IngredientService } from './services/Ingredient';

const ingredientService = IngredientService();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ ingredientService }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);