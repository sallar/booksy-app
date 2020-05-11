import React, { useState } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { authorizeUser } from '../api/auth';
import { NavigationComponent, setMainAsRoot } from '../navigation';
import { useAppState } from '../store/app.store';

const AuthScreen: NavigationComponent = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useAppState();

  const handleSignInClicked = async () => {
    setLoading(true);
    const result = await authorizeUser();
    setLoading(false);
    if (result) {
      setToken(result);
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
