import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './index.css';
import { AUTHOR, COPYRIGHT, RELEASE_YEAR, TITLE } from '../../config/constants';
import dateUtil from '../../utils/date';
import { CaloriesCalculator } from './components/caloriescalculator';

export const App = () => {

  const currentYear = dateUtil.getCurrentDate().getFullYear();

  const copyrightYear = (currentYear === RELEASE_YEAR ? '' : `-${currentYear}`);
  const copyright = <>
    {COPYRIGHT} &copy; {AUTHOR} - {RELEASE_YEAR}{copyrightYear}
  </>

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
      <footer>
        {copyright}
      </footer>

    </BrowserRouter>
  );
}
