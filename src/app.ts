import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';
import 'mobx-react-lite/batchingForReactNative';
import { Navigation } from 'react-native-navigation';
import { setAuthAsRoot, setMainAsRoot } from './navigation';
import { registerScreens } from './screens/register';
import { appStore } from './store/app.store';

registerScreens();

async function hydrateStores() {
  const hydrate = create({ storage: AsyncStorage });
  await hydrate('AppStore', appStore);
}

// Listen for project start event
Navigation.events().registerAppLaunchedListener(async () => {
  await hydrateStores();

  // Default Options
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      style: 'light',
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
      drawBehind: true,
      translucent: true,
    },
  });

  if (appStore.token) {
    setMainAsRoot();
  } else {
    setAuthAsRoot();
  }
});
