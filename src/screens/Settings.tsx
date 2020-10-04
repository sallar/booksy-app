import Colors from '@utils/colors';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useQuery } from 'urql';
import { clearSession } from '../api/auth';
import { setAuthAsRoot } from '../navigation/layouts';
import { useAppState } from '../store/app.store';

const SettingsScreen: NavigationFunctionComponent = observer(() => {
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
          <Text style={{ color: Colors.label }}>{res.data.me.username}</Text>
          <Text style={{ color: Colors.label }}>{res.data.me.email}</Text>
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
