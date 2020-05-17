import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { useQuery } from 'urql';
import { clearSession } from '../api/auth';
import { NavigationComponent, setAuthAsRoot } from '../navigation';
import { useAppState } from '../store/app.store';

const SettingsScreen: NavigationComponent = observer(() => {
  const [res, executeQuery] = useQuery({
    query: `
      query { me { email username } }
    `,
  });
  const { clearToken } = useAppState();

  const onLogoutClicked = async () => {
    await clearSession();
    clearToken();
    setAuthAsRoot();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {res.fetching && <ActivityIndicator />}
      {res.data && res.data.me && (
        <>
          <Text style={{ color: 'white' }}>{res.data.me.username}</Text>
          <Text style={{ color: 'white' }}>{res.data.me.email}</Text>
        </>
      )}
      <Button title="Logout" onPress={onLogoutClicked} />
    </View>
  );
});

SettingsScreen.options = () => ({
  topBar: {
    title: {
      text: 'Settings',
    },
  },
});

export default SettingsScreen;
