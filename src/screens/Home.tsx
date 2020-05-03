import React from 'react';
import {Text, View} from 'react-native';
import {NavigationComponent} from '../types/navigation';

const HomeScreen: NavigationComponent = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'white'}}>Home Screen</Text>
    </View>
  );
};

HomeScreen.options = () => ({
  topBar: {
    searchBar: true,
    searchBarPlaceholder: 'Search your library...',
    title: {
      text: 'Booksy',
    },
  },
});

export default HomeScreen;
