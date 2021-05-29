import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { CaloriesCalculator } from './components/caloriescalculator';
import { TITLE } from '../../config/constants';
import { Footer } from '../components/footer';
import './index.css';

export const App = () => {

  return (
    <BrowserRouter>
      <header>
        <div>
          <img src='cooking.png' alt='Cooking logo'></img>
          <span>{TITLE}</span>
        </div>
        <nav>
          <ul>
            <li><Link to='/'>Calories Calculator</Link></li>
            <li>|</li>
            <li><Link to='/convert'>Unit conversion</Link></li>
          </ul>
        </nav>
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
