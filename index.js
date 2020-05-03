import {Navigation} from 'react-native-navigation';
import App from './App';
import {registerScreens} from './src/screens/register';
import Routes from './src/screens/routes';
import {setMainAsRoot} from './src/navigation';

registerScreens();

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
  setMainAsRoot();
});
