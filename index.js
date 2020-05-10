import {Navigation} from 'react-native-navigation';
import App from './App';
import {registerScreens} from './src/screens/register';
import Routes from './src/screens/routes';
import {setMainAsRoot, setAuthAsRoot} from './src/navigation';
import {retrieve} from './src/utils/storage';
import {setToken} from './src/api/auth';

registerScreens();

// Listen for project start event
Navigation.events().registerAppLaunchedListener(async () => {
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
  // If user is authenticated do this:
  // setMainAsRoot();
  const token = await retrieve('auth_key');
  if (token) {
    setToken(token);
    setMainAsRoot();
  } else {
    setAuthAsRoot();
  }
});
