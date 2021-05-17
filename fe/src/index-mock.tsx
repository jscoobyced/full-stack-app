import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './pages/Home';
import { MockConfigurationService } from './services/Configuration/mock';
import { ServiceContext } from './services/Context';

const configurationService = MockConfigurationService();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ configuration: configurationService }}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);