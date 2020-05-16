import React from 'react';
import { Navigation } from 'react-native-navigation';
import AppProvider from '../AppProvider';
import { NavigationComponent } from '../navigation';
import AuthScreen from './Auth';
import BookDetails from './BookDetails';
import HomeScreen from './Home';
import Routes from './routes';
import SearchScreen from './Search';
import SettingsScreen from './Settings';
import ShelvesScreen from './Shelves';

const map = new Map<Routes, NavigationComponent<any>>();

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
