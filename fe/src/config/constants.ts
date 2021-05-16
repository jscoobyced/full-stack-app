export const TITLE = "React Application with ExpressJS and MariaDB back-end";
export const COPYRIGHT = "Copyright"
export const AUTHOR = "Cédric Rochefolle";
export const RELEASE_YEAR = 2021;

export const BACK_END_URL = `http://${process.env.REACT_APP_BACK_END_API_HOST}:${process.env.REACT_APP_BACK_END_API_PORT}/`;
export const BACK_END_SERVICES_ENDPOINTS = {
  getUsers: 'v1/users',
  addUser: 'v1/users',
  getUserByUsername: 'v1/userByUsername'
}