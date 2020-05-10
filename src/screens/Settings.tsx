import React from 'react';
import { Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationComponent, setAuthAsRoot } from '../navigation';
import { clearSession } from '../api/auth';
import { remove } from '../utils/storage';
import { useQuery } from 'urql';

const SettingsScreen: NavigationComponent = () => {
  const [res, executeQuery] = useQuery({
    query: `
      query { me { email username } }
    `,
  });

  const onLogoutClicked = async () => {
    await clearSession();
    await remove('auth_key');
    setAuthAsRoot();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {res.fetching && <ActivityIndicator />}
      {res.data && res.data.me && (
        <>
          <Text style={{ color: 'white' }}>{res.data.me.username}</Text>
          <Text style={{ color: 'white' }}>{res.data.me.email}</Text>
          <Button title="Logout" onPress={onLogoutClicked} />
        </>
      )}
    </View>
  );
};

SettingsScreen.options = () => ({
  topBar: {
    title: {
      text: 'Settings',
    },
  },
});

export default SettingsScreen;
