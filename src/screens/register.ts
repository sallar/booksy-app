import Routes from './routes';
import HomeScreen from './Home';
import {NavigationComponent} from '../navigation';
import SearchScreen from './Search';
import BookDetails from './BookDetails';
import SettingsScreen from './Settings';
import {Navigation} from 'react-native-navigation';

const map = new Map<Routes, NavigationComponent<any>>();

// Add screens
map.set(Routes.HomeScreen, HomeScreen);
map.set(Routes.SearchScreen, SearchScreen);
map.set(Routes.BookDetails, BookDetails);
map.set(Routes.SettingsScreen, SettingsScreen);

export const registerScreens = () => {
  map.forEach((screen, route) => {
    Navigation.registerComponent(route, () => screen);
  });
};
