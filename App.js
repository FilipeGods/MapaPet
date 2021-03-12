import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import SingIn, {InseideApp} from './src/StackNavigator';
import DrawerNavigator from './src/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}