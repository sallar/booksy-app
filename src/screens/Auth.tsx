import { authorizeUser } from '@api/auth';
import { setMainAsRoot } from '@navigation/layouts';
import { useAppState } from '@store/app.store';
import React, { useState } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

const AuthScreen: NavigationFunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useAppState();

  const handleSignInClicked = async () => {
    setLoading(true);
    try {
      const result = await authorizeUser();
      if (result) {
        setToken(result);
        setMainAsRoot();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size={32} />
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
