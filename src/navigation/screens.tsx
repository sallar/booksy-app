import React from 'react';
import {
  Navigation,
  NavigationFunctionComponent,
} from 'react-native-navigation';
import AppProvider from '../AppProvider';
import AuthScreen from '../screens/Auth';
import BookDetails from '../screens/BookDetails';
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import SettingsScreen from '../screens/Settings';
import ShelvesScreen from '../screens/Shelves';
import Routes from './routes';

const map = new Map<Routes, NavigationFunctionComponent<any>>();

// Add screens
map.set(Routes.HomeScreen, HomeScreen);
map.set(Routes.SearchScreen, SearchScreen);
map.set(Routes.BookDetails, BookDetails);
map.set(Routes.SettingsScreen, SettingsScreen);
map.set(Routes.AuthScreen, AuthScreen);
map.set(Routes.ShelvesScreen, ShelvesScreen);

export const registerScreens = () => {
  map.forEach((ScreenComponent, route) => {
    Navigation.registerComponent(
      route,
      () => (props) => (
        <AppProvider>
          <ScreenComponent {...props} />
        </AppProvider>
      ),
      () => ScreenComponent,
    );
  });
};
