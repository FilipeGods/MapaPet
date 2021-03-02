import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

//COMPONENTS
import MainHeader from '../components/MainHeader';
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
              <MainHeader 
                title="Cadastro"
                style={styles.MainHeader}>
              </MainHeader>
              <CadastroComponent style={styles.cadastroComponent}></CadastroComponent>
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