import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/Cooking';
import { ServiceContext } from './services/Context';
import { mockContext } from './services/Context/mock';
import './index.css';

const { ingredientService, handler, createUser } = mockContext();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ ingredientService, handler, createUser }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
