import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './pages/Home';
import { ServiceContext } from './services/Context';
import { UserService } from './services/User';

const userService = UserService();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ userService }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);