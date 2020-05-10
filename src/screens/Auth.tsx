import React, { useState } from 'react';
import { Button, View, ActivityIndicator } from 'react-native';
import { authorizeUser, setCachedAuthToken } from '../api/auth';
import { NavigationComponent, setMainAsRoot } from '../navigation';
import { store } from '../utils/storage';

const AuthScreen: NavigationComponent = () => {
  const [loading, setLoading] = useState(false);

  const handleSignInClicked = async () => {
    setLoading(true);
    const result = await authorizeUser();
    setLoading(false);
    if (result) {
      await store('auth_key', result);
      setCachedAuthToken(result);
      setMainAsRoot();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Sign In / Sign Up" onPress={handleSignInClicked} />
      )}
    </View>
  );
};

AuthScreen.options = () => ({
  topBar: {
    visible: false,
  },
});

export default AuthScreen;
