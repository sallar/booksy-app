import React from 'react';
import {Button, View} from 'react-native';
import {authorize, setToken} from '../api/auth';
import {NavigationComponent, setMainAsRoot} from '../navigation';
import {store} from '../utils/storage';

const AuthScreen: NavigationComponent = () => {
  const handleSignInClicked = async () => {
    const result = await authorize();
    await store('auth_key', result);
    setToken(result);
    setMainAsRoot();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Sign In / Sign Up" onPress={handleSignInClicked} />
    </View>
  );
};

AuthScreen.options = () => ({
  topBar: {
    visible: false,
  },
});

export default AuthScreen;
