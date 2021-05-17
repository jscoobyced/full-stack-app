import React from 'react';
import ReactDOM from 'react-dom';
import './Poppins-Light.ttf';
import './index.css';
import { App } from './pages/Home';
import { ServiceContext } from './services/Context';
import { MockConfigurationService } from './services/Configuration/mock';

const configurationService = MockConfigurationService();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{ configuration: configurationService}}>
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);