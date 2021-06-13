import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { CaloriesCalculator } from './Cooking/caloriescalculator';
import { Footer } from './components/Footer/footer';
import SignInButton from './components/Login/SignInButton';
import { newSecureUser } from '../models/user';
import { ServiceContext } from '../services/Context';
import { Home } from './Home/home';
import { Header } from './components/Header';
import { IIngredientService } from '../services/Ingredient';
import { IAuthenticationHandler } from '../services/Authentication/handler';
import { IUserService } from '../services/Authentication';
import { IRecipeService } from '../services/Recipe';
import { LanguageService } from '../services/i18n';
import { Language } from '../models/common';
import './index.css';

interface AppProps {
  ingredientService: IIngredientService
  handler: IAuthenticationHandler;
  userService: IUserService;
  recipeService: IRecipeService;
  languageService: LanguageService;
}

export const App = (props: AppProps) => {
  const {
    ingredientService, handler, userService, recipeService, languageService
  } = props;
  const [language, setLanguage] = useState(Language.English);
  const [user, setUser] = useState(newSecureUser());
  const getTranslations = () => languageService.getTranslations(language);
  const translations = getTranslations();

  return (
    <ServiceContext.Provider value=
      {{ ingredientService, handler, userService, recipeService, setLanguage, getTranslations, language }}>

      <BrowserRouter>
        <Header></Header>
        <div className='container'>
          <main>
            <Switch>
              <Route path="/" exact={true}>
                <Home />
              </Route>
              <Route path="/calc" exact={true}>
                <CaloriesCalculator
                  translations={translations}
                  user={user} />
              </Route>
            </Switch>
            <section className='login'>
              <SignInButton
                setUser={setUser}
                userService={userService}
                handler={handler}
                translations={translations}
              />
              <span>{user && user.user && user.user.firstName}</span>
            </section>
          </main>
        </div>
        <Footer></Footer>
      </BrowserRouter>
    </ServiceContext.Provider>
  );
}
