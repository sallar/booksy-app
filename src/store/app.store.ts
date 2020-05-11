import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import React from 'react';

class AppStore {
  @persist @observable token: string | null = null;

  @action.bound
  setToken(token: string) {
    this.token = token;
  }

  @action.bound
  clearToken() {
    this.token = null;
  }
}

export const appStore = new AppStore();
export const AppStoreContext = React.createContext(appStore);
export const useAppState = () => {
  return React.useContext(AppStoreContext);
};
