import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './pages/';
import { ServiceContext } from './services/Context';
import { mockContext } from './services/Context/mock';
import { GoogleAuthenticationHandler } from './services/Authentication/Google/google-handler';
import './index.css';

const { ingredientService, userService } = mockContext();
const handler = new GoogleAuthenticationHandler();


ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ ingredientService, handler, userService }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
