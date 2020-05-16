import { Options, Navigation } from 'react-native-navigation';
import Routes from './screens/routes';

export interface NavigationComponentOptions<P> {
  options?: (passProps?: P) => Options;
}

export type NavigationComponent<P = {}> = React.FunctionComponent<
  P & {
    componentId: string;
  }
> &
  NavigationComponentOptions<P>;

export const setMainAsRoot = () =>
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
                    name: Routes.HomeScreen,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./resources/bird-house.png'),
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
                    name: Routes.SearchScreen,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./resources/search-1.png'),
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
                    name: Routes.SettingsScreen,
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./resources/cog-1.png'),
                  text: 'Settings',
                },
              },
            },
          },
        ],
      },
    },
  });

export const setAuthAsRoot = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Routes.AuthScreen,
            },
          },
        ],
      },
    },
  });
};

export const navigateTo = (
  componentId: string,
  route: Routes,
  passProps: any = {},
) =>
  Navigation.push(componentId, {
    component: {
      name: route,
      passProps,
    },
  });

export const showModal = (
  componentId: string,
  route: Routes,
  passProps: any = {},
) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name: route,
            passProps,
          },
        },
      ],
    },
  });
};

export const dismissModal = (componentId: string) => {
  Navigation.dismissModal(componentId);
};
