export const TITLE = "Cooking for fun";
export const COPYRIGHT = "Copyright"
export const AUTHOR = "Cédric Rochefolle";
export const RELEASE_YEAR = 2021;

export const BACK_END_URL = `https://${process.env.REACT_APP_BACK_END_API_HOST}:${process.env.REACT_APP_BACK_END_API_PORT}/`;
export const BACK_END_SERVICES_ENDPOINTS = {
  getIngredients: 'v1/ingredients',
}