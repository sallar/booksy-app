import React from 'react';
import {Navigation} from 'react-native-navigation';
import {AppearanceProvider} from 'react-native-appearance';
import {NavigationComponent} from '../navigation';
import BookDetails from './BookDetails';
import HomeScreen from './Home';
import Routes from './routes';
import SearchScreen from './Search';
import SettingsScreen from './Settings';
import AuthScreen from './Auth';
import {createClient, Provider} from 'urql';
import {getToken} from '../api/auth';

const map = new Map<Routes, NavigationComponent<any>>();
const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => {
    const token = getToken();
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

// Add screens
map.set(Routes.HomeScreen, HomeScreen);
map.set(Routes.SearchScreen, SearchScreen);
map.set(Routes.BookDetails, BookDetails);
map.set(Routes.SettingsScreen, SettingsScreen);
map.set(Routes.AuthScreen, AuthScreen);

export const registerScreens = () => {
  map.forEach((ScreenComponent, route) => {
    Navigation.registerComponent(
      route,
      () => props => (
        <AppearanceProvider>
          <Provider value={client}>
            <ScreenComponent {...props} />
          </Provider>
        </AppearanceProvider>
      ),
      () => ScreenComponent,
    );
  });
};
