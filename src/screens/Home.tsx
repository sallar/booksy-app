import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';

const HomeScreen: NavigationFunctionComponent = observer(() => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: 'white' }}>Home Screen</Text>
    </View>
  );
});

HomeScreen.options = () => ({
  topBar: {
    searchBar: {
      visible: true,
      placeholder: 'Search your library...',
    },
    title: {
      text: 'Booksy',
    },
  },
});

export default HomeScreen;
