import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

//COMPONENTS
import MainHeader from '../components/MainHeader';
import MenuHeader from '../components/MenuHeader';
import CadastroAnimaisComponent from '../components/CadastroAnimaisComponent';

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
        <ScrollView style={styles.container}>
            <CadastroAnimaisComponent style={styles.cadastroComponent}></CadastroAnimaisComponent>
        </ScrollView>
    );
}

              
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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