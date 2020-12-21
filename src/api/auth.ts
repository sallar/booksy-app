import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'booksyapp.eu.auth0.com',
  clientId: 'sBKuIRVvlviUv9OSn4zBfrCj7ph3qbS5',
});

export const authorizeUser = async (): Promise<string | null> => {
  const credentials = await auth0.webAuth.authorize({
    scope: 'openid profile email',
  });
  const { idToken } = credentials;
  const resp = await fetch('https://api.booksy.app/api/exchange', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const { accessToken } = await resp.json();
  return accessToken;
};

export const clearSession = async (): Promise<boolean> => {
  try {
    await auth0.webAuth.clearSession();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
