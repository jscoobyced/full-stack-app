export const TITLE = "Pheung & Céd homepage";
export const COPYRIGHT = "Copyright"
export const AUTHOR = "Cédric Rochefolle";
export const RELEASE_YEAR = 2021;

export const SIGNIN = 'Sign In';
export const SIGNOUT = 'Sign Out';

export const BACK_END_URL = `${process.env.REACT_APP_BACK_END_API_SCHEME}://${process.env.REACT_APP_BACK_END_API_HOST}:${process.env.REACT_APP_BACK_END_API_PORT}/`;
export const BACK_END_SERVICES_ENDPOINTS = {
  getIngredients: 'v1/ingredients',
  saveRecipes: 'v1/recipes',
  userLogin: 'v1/users/login',
  getRecipes: 'v1/recipes',
}

/* istanbul ignore next */
export const getGoogleParams = () => ({
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  scope: process.env.REACT_APP_GOOGLE_SCOPE,
  accessType: process.env.REACT_APP_GOOGLE_ACCESS_TYPE,
  cookiePolicy: process.env.REACT_APP_GOOGLE_COOKIE_POLICY,
  fetchBasicProfile: process.env.REACT_APP_GOOGLE_FETCH_BASIC_PROFILE,
});
