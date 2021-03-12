import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Text,TouchableOpacity } from "react-native";
import {FontAwesome5} from '@expo/vector-icons'

import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from '../homescreen/Login';

const Drawer = createDrawerNavigator();

function MenuHeader(props) {
  return (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Login} />
        </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.23,
    shadowRadius: 0
  },
  rect: {
    backgroundColor: "rgba(94,53,177,1)",
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%'
  },
  title: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    marginTop: 40
  }
});

export default MenuHeader;
