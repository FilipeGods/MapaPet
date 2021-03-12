import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import SignIn, { InsideApp } from "./StackNavigator";

import index from './pages/maps/index';
import login from './pages/homescreen/Login';
import cadastro from './pages/homescreen/Cadastro';
import menuPrincipal from './pages/homescreen/MenuPrincipal';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="login" component={login} options={{swipeEnabled: false, drawerLabel: 'Logout'}}/>
      <Drawer.Screen name="cadastro" component={cadastro} options={{drawerLabel: () => null}}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;