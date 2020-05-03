import React from 'react';
import {Navigation} from 'react-native-navigation';
import {AppearanceProvider} from 'react-native-appearance';
import {NavigationComponent} from '../navigation';
import BookDetails from './BookDetails';
import HomeScreen from './Home';
import Routes from './routes';
import SearchScreen from './Search';
import SettingsScreen from './Settings';

const map = new Map<Routes, NavigationComponent<any>>();

// Add screens
map.set(Routes.HomeScreen, HomeScreen);
map.set(Routes.SearchScreen, SearchScreen);
map.set(Routes.BookDetails, BookDetails);
map.set(Routes.SettingsScreen, SettingsScreen);

export const registerScreens = () => {
  map.forEach((ScreenComponent, route) => {
    Navigation.registerComponent(
      route,
      () => props => (
        <AppearanceProvider>
          <ScreenComponent {...props} />
        </AppearanceProvider>
      ),
      () => ScreenComponent,
    );
  });
};
