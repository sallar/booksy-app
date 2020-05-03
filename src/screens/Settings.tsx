import React from 'react';
import {Text, View} from 'react-native';
import {NavigationComponent} from '../types/navigation';

const SettingsScreen: NavigationComponent = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'white'}}>Settings Screen</Text>
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
