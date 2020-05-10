import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'booksyapp.eu.auth0.com',
  clientId: 'sBKuIRVvlviUv9OSn4zBfrCj7ph3qbS5',
});

let __userTokenCache: undefined | string;

export const getToken = () => {
  return __userTokenCache;
};

export const setToken = (token: string) => {
  __userTokenCache = token;
};

export const authorize = async () => {
  try {
    let credentials = await auth0.webAuth.authorize({
      scope: 'openid profile email',
    });
    const {idToken} = credentials;
    const resp = await fetch('http://localhost:3000/api/exchange', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const {accessToken} = await resp.json();
    return accessToken;
  } catch (error) {
    return console.log(error);
  }
};

export const clearSession = async () => {
  try {
    return auth0.webAuth.clearSession();
  } catch (error) {
    console.log('Log out cancelled');
  }
};
