import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import api from '../../services/api';

//import { LoginScreen, CadastroScreen } from '../components/aux-components/MenuEsquerda/itensMenuEsquerda'
 
//COMPONENTS
import MainHeader from '../components/MainHeader';
import MenuHeader from '../components/MenuHeader'
import CadastroComponent from '../components/CadastroComponent';

export default function Cadastro() { 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
async function handleCreateUser(e) {
    console.log('chamei o cadastro');
        api.post('users', {
            name,
            email,
            password
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
        }).catch(() => {
            alert('Erro no cadastro');
        });
    }

    return (
        <View style={styles.container}>
              <MenuHeader 
                title="MenuPrincipal"
                style={styles.MainHeader}>
              </MenuHeader>
              
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    MainHeader: {
        flex: 1
    },
    cadastroComponent: {
        flex: 5,
        alignSelf: 'center'
    }
  });