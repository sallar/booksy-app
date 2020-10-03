import { appStore } from '@store/app.store';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => {
    const token =
      appStore.token ?? 'fnED3Pf_zgACDQOv3u4XcAILJZEbsflA9ThlEi4vpnbApTe5Nfg';
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
