import {AuthConfig} from '../interfaces/interfaces';
export const getAuth0Config = (): AuthConfig => ({
    domain: process.env.REACT_APP_AUTH0_DOMAIN || '',
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
    authorizationParams: {
      audience: process.env.REACT_APP_AUTH0_AUDIENCE || '',
      redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI || window.location.origin,
      scope: 'openid profile email',
    },
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
  });