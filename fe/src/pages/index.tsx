import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { CaloriesCalculator } from './Cooking/caloriescalculator';
import { SIGNIN, SIGNOUT, TITLE } from '../config/constants';
import { Footer } from './components/Footer/footer';
import SignInButton from './components/Login/SignInButton';
import { useContext, useState } from 'react';
import { newSecureUser } from '../models/user';
import { ServiceContext } from '../services/Context';
import './index.css';
import { Home } from './Home/home';

export const App = () => {
  const [user, setUser] = useState(newSecureUser());
  const { userService, handler } = useContext(ServiceContext);

  return (
    <BrowserRouter>
      <header>
        <span className='title'>{TITLE}</span>
        <nav>
          <Link to='/'>Home</Link>
          {' '}|{' '}
          <Link to='/calc'>Calories Calculator</Link>
        </nav>
      </header>
      <div className='container'>
        <main>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/calc" exact={true}>
              <CaloriesCalculator
                user={user} />
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
      </div>
      <Footer></Footer>
    </BrowserRouter>
  );
}
