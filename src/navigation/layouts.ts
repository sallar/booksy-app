import { LayoutRoot, Navigation } from 'react-native-navigation';
import Routes from './routes';
import { setLayoutStackChildren } from './utils';

export const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      drawBehind: true,
    },
    topBar: {
      drawBehind: true,
      background: {
        translucent: true,
      },
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
      titleDisplayMode: 'alwaysHide',
      drawBehind: true,
      translucent: true,
    },
  });
};

enum AppLayout {
  Auth = 'auth',
  Main = 'main',
}

const layouts: Record<AppLayout, LayoutRoot> = {
  [AppLayout.Main]: {
    root: {
      bottomTabs: {
        id: 'BOOKSY_BOTTOM_TABS',
        children: [
          setLayoutStackChildren(
            {
              name: Routes.HomeScreen,
            },
            {
              bottomTab: {
                icon: require('../../assets/bird-house.png'),
              },
            },
          ),
          setLayoutStackChildren(
            {
              name: Routes.SearchScreen,
            },
            {
              bottomTab: {
                icon: require('../../assets/search-1.png'),
              },
            },
          ),
          setLayoutStackChildren(
            {
              name: Routes.SettingsScreen,
            },
            {
              bottomTab: {
                icon: require('../../assets/cog-1.png'),
              },
            },
          ),
        ],
      },
    },
  },
  [AppLayout.Auth]: {
    root: setLayoutStackChildren({
      name: Routes.AuthScreen,
    }),
  },
};

export const setMainAsRoot = () => {
  Navigation.setRoot(layouts[AppLayout.Main]);
};

export const setAuthAsRoot = () => {
  Navigation.setRoot(layouts[AppLayout.Auth]);
};
