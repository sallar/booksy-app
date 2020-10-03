import React, { useState } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { authorizeUser } from '../api/auth';
import { setMainAsRoot } from '../navigation/layouts';
import { useAppState } from '../store/app.store';

const AuthScreen: NavigationFunctionComponent = () => {
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
