import Colors from '@utils/colors';
import { Platform } from 'react-native';
import {
  LayoutRoot,
  Navigation,
  OptionsBottomTabs,
  OptionsLayout,
  OptionsTopBar,
} from 'react-native-navigation';
import Routes from './routes';
import { setLayoutStackChildren } from './utils';

export const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    layout: Platform.select<OptionsLayout>({
      ios: {
        componentBackgroundColor: Colors.background,
      },
      android: {
        backgroundColor: Colors.background,
      },
    }),
    statusBar: {
      visible: true,
      drawBehind: true,
      translucent: true,
    },
    topBar: Platform.select<OptionsTopBar>({
      ios: {
        drawBehind: true,
        background: {
          translucent: true,
        },
        largeTitle: {
          visible: true,
        },
      },
      android: {
        background: {
          color: Colors.card,
        },
        title: {
          color: Colors.label,
        },
        backButton: {
          color: Colors.label,
        },
      },
    }),
    bottomTab: {
      iconColor: Colors.label,
      selectedIconColor: Colors.accent,
    },
    navigationBar: {
      backgroundColor: Colors.card,
    },
    bottomTabs: Platform.select<OptionsBottomTabs>({
      ios: {
        titleDisplayMode: 'alwaysHide',
        drawBehind: true,
        translucent: true,
      },
      android: {
        titleDisplayMode: 'alwaysHide',
        backgroundColor: Colors.card,
      },
    }),
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
