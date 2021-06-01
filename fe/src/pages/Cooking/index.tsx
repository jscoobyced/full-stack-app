import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CaloriesCalculator } from './components/caloriescalculator';
import { TITLE } from '../../config/constants';
import { Footer } from '../components/Footer/footer';
import SignInButton from '../components/Login/google';
import { useContext, useState } from 'react';
import { newSecureUser } from '../../models/user';
import { ServiceContext } from '../../services/Context';
import './index.css';

export const App = () => {
  const [user, setUser] = useState(newSecureUser());
  const { createUser, handler } = useContext(ServiceContext);

  return (
    <BrowserRouter>
      <header>
        <span className='title'>{TITLE}</span>
        <img src='cooking.png' alt='Cooking logo'></img>
        <div>
          <SignInButton
            signInText='Sign-In'
            signOutText='Sign-Out'
            setUser={setUser}
            createUser={createUser}
            handler={handler}
          />
          {user && user.user && user.user.name}
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
