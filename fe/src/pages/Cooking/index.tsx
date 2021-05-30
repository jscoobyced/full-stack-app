import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CaloriesCalculator } from './components/caloriescalculator';
import { TITLE } from '../../config/constants';
import { Footer } from '../components/footer';
import './index.css';

export const App = () => {

  return (
    <BrowserRouter>
      <header>
        <div>
          <span>{TITLE}</span>
          <img src='cooking.png' alt='Cooking logo'></img>
        </div>
      </header>
      <main>
        <Switch>
          <Route path="/" exact={true}>
            <CaloriesCalculator />
          </Route>
        </Switch>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}
