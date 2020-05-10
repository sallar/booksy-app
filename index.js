import { Navigation } from 'react-native-navigation';
import { setCachedAuthToken } from './src/api/auth';
import { setAuthAsRoot, setMainAsRoot } from './src/navigation';
import { registerScreens } from './src/screens/register';
import { retrieve } from './src/utils/storage';

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

  const token = await retrieve('auth_key');
  if (token) {
    setCachedAuthToken(token);
    setMainAsRoot();
  } else {
    setAuthAsRoot();
  }
});
