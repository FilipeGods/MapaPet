import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import index from './pages/maps/index';
import login from './pages/homescreen/Login';
import cadastro from './pages/homescreen/Cadastro';
import menuPrincipal from './pages/homescreen/MenuPrincipal';


const SignIn = () => {
    return(
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="login" component={login} />
            <AppStack.Screen name="index" component={index} /> 
            <AppStack.Screen name="cadastro" component={cadastro} /> 
            <AppStack.Screen name="menuPrincipal" component={menuPrincipal} /> 
        </AppStack.Navigator>
    );
}

export default SignIn;

export const InsideApp = () => {
    return(
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="login" component={login} />
            <AppStack.Screen name="index" component={index} /> 
            <AppStack.Screen name="cadastro" component={cadastro} /> 
            <AppStack.Screen name="menuPrincipal" component={menuPrincipal} /> 
        </AppStack.Navigator>
    );
}



