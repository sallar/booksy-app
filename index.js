import {Navigation} from 'react-native-navigation';
import App from './App';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import SettingsScreen from './src/screens/Settings';

// Register All the Components
Navigation.registerComponent('app.Booksy.HomeScreen', () => HomeScreen);
Navigation.registerComponent('app.Booksy.SearchScreen', () => SearchScreen);
Navigation.registerComponent('app.Booksy.SettingsScreen', () => SettingsScreen);

// Listen for project start event
Navigation.events().registerAppLaunchedListener(() => {
  // Default Options
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      style: 'light',
      drawBehind: true,
    },
    topBar: {
      drawBehind: true,
      largeTitle: {
        visible: true,
      },
    },
    bottomTab: {
      iconColor: 'white',
      selectedIconColor: '#147EFB',
      textColor: 'white',
      selectedTextColor: '#147EFB',
    },
    bottomTabs: {
      drawBehind: true,
    },
  });

  // Set Root
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOOKSY_BOTTOM_TABS',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'app.Booksy.HomeScreen',
                    options: {
                      topBar: {
                        searchBar: true,
                        searchBarPlaceholder: 'Search your library...',
                        title: {
                          text: 'Booksy',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./src/resources/bird-house.png'),
                  text: 'Home',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'app.Booksy.SearchScreen',
                    options: {
                      topBar: {
                        searchBar: true,
                        searchBarPlaceholder:
                          'Look for titles, authors, ISBN...',
                        title: {
                          text: 'Search',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./src/resources/search-1.png'),
                  text: 'Search',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'app.Booksy.SettingsScreen',
                    options: {
                      topBar: {
                        title: {
                          text: 'Settings',
                        },
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./src/resources/cog-1.png'),
                  text: 'Settings',
                },
              },
            },
          },
        ],
      },
    },
  });
});
