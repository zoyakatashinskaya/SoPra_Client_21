import { isProduction } from './isProduction';

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * Everything is fixed
 * @returns {string}
 */
export const getDomain = () => {
  const prodUrl = 'https://sopra-fs21-zkatas-server.herokuapp.com/';
  const devUrl = 'http://localhost:8080';

  return isProduction() ? prodUrl : devUrl;
};
