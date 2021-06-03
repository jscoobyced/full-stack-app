import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CaloriesCalculator } from './components/caloriescalculator';
import { SIGNIN, SIGNOUT, TITLE } from '../../config/constants';
import { Footer } from '../components/Footer/footer';
import SignInButton from '../components/Login/SignInButton';
import { useContext, useState } from 'react';
import { newSecureUser } from '../../models/user';
import { ServiceContext } from '../../services/Context';
import './index.css';

export const App = () => {
  const [user, setUser] = useState(newSecureUser());
  const { userService, handler } = useContext(ServiceContext);

  return (
    <BrowserRouter>
      <header>
        <img src='owls.png' className='owls' alt='Owls'></img>
        <span className='title'>{TITLE}</span>
        <img src='cooking.png' className='logo' alt='Cooking logo'></img>
      </header>
      <main>
        <Switch>
          <Route path="/" exact={true}>
            <CaloriesCalculator />
          </Route>
        </Switch>
        <section className='login'>
          <SignInButton
            signInText={SIGNIN}
            signOutText={SIGNOUT}
            setUser={setUser}
            userService={userService}
            handler={handler}
          />
          <span>{user && user.user && user.user.firstName}</span>
        </section>
      </main>
      <Footer></Footer>
    </BrowserRouter>
  );
}
