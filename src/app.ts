import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';
import 'mobx-react-lite/batchingForReactNative';
import { Navigation } from 'react-native-navigation';
import {
  setAuthAsRoot,
  setDefaultOptions,
  setMainAsRoot,
} from './navigation/layouts';
import { registerScreens } from './navigation/screens';
import { appStore } from './store/app.store';

registerScreens();

async function hydrateStores() {
  const hydrate = create({ storage: AsyncStorage });
  await hydrate('AppStore', appStore);
}

// Listen for project start event
Navigation.events().registerAppLaunchedListener(async () => {
  await hydrateStores();
  setDefaultOptions();

  if (appStore.token) {
    setMainAsRoot();
  } else {
    setAuthAsRoot();
  }
});
