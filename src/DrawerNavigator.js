import React from "react";

import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import SignIn, { InsideApp } from "./StackNavigator";
import MainHeader from './pages/components/MainHeader'

import index from './pages/maps/index';
import login from './pages/homescreen/Login';
import cadastro from './pages/homescreen/Cadastro';
import menuPrincipal from './pages/homescreen/MenuPrincipal';
import listaAnimais from './pages/homescreen/ListaAnimais';
import listaAnimaisPerdidos from './pages/homescreen/ListaAnimaisPerdidos';
import cadastroAnimais from './pages/homescreen/CadastroAnimais';
import camera from './pages/homescreen/Camera';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      /* insira aqui código para filtragem dos itens */
    >
      <Drawer.Screen 
        name="login" 
        component={login} 
        options={headerLogin}/>
      <Drawer.Screen 
        name="cadastro" 
        component={cadastro} 
        options={headerNoButton}/>
      <Drawer.Screen 
        name="listaAnimais"
        component={listaAnimais}
        options={headerListaAnimais}
      />
      <Drawer.Screen 
        name="listaAnimaisPerdidos"
        component={listaAnimaisPerdidos}
        options={headerListaAnimaisPerdidos}
      />
      <Drawer.Screen 
        name="CadastrarAnimal"
        component={cadastroAnimais}
        options={headerCadastroAnimais}
      />
      <Drawer.Screen 
        name="Camera"
        component={camera}
        options={{}}
      />
    </Drawer.Navigator>
  );
};

// código para filtragem dos itens
/*
drawerContent={props => {
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routeNames: props.state.routeNames.filter(
        routeName => routeName !== 'cadastro'
      ),
      routes: props.state.routes.filter(
        route => route.name !== 'cadastro'
      ),
    },
  };
  return (
    <DrawerContentScrollView {...filteredProps}>
      <DrawerItemList {...filteredProps} />
    </DrawerContentScrollView>
  );
}} 
*/

// CONFIGURAÇÕES GENERICAS
const headerButton = {
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

const headerNoButton = {
  headerLeft: () => {},
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

const headerNoButtonNoGesture = {
  headerLeft: () => {},
  swipeEnabled: false,
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

//CONFIGURAÇÕES ESPECIFICAS

const headerLogin = {
  headerLeft: () => {},
  swipeEnabled: false,
  drawerLabel: 'Logout',
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

const headerListaAnimais = {
  drawerLabel: 'Meus Animais',
  title: 'Meus Animais',
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

const headerListaAnimaisPerdidos = {
  drawerLabel: 'Animais Perdidos',
  title: 'Animais Perdidos',
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

const headerCadastroAnimais = {
  drawerLabel: 'Cadastrar Animal',
  title: 'Cadastrar Animal',
  headerShown: true,
  headerStyle: {backgroundColor: "rgba(94,53,177,1)", },
  headerTitleStyle: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
  },
  headerTitleAlign: 'center',
  headerTintColor: 'white'
}

export default DrawerNavigator;