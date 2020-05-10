import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { createClient, Provider } from 'urql';
import { getCachedAuthToken } from './api/auth';

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => {
    const token = getCachedAuthToken();
    if (!token) {
      return {};
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
});

const AppProvider: React.FunctionComponent = ({ children }) => {
  return (
    <AppearanceProvider>
      <Provider value={client}>{children}</Provider>
    </AppearanceProvider>
  );
};

export default AppProvider;
