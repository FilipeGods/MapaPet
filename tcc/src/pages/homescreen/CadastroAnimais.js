import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//COMPONENTS
import MainHeader from '../components/MainHeader';
import MenuHeader from '../components/MenuHeader';
import CadastroAnimaisComponent from '../components/CadastroAnimaisComponent';

let picture, 
    previusPage,
    lastParams = null;
export default function Cadastro({ route }) {
    console.log('==================CadastroAnimais: ');
    console.log(route.params)

    const [pictureContent, setPictureContent] = useState('');
    const navigation = useNavigation();
    
    React.useEffect(
        () => navigation.addListener('focus', () => {
  
        }),
        []
      );
    
     if(route.params){
        //console.log(route.params.picture)
        picture = route.params.picture;
        previusPage = route.params.previusPage;
    } else {
        picture = null; 
        previusPage = null;
    }
      
    

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
            <CadastroAnimaisComponent 
                style={styles.cadastroComponent} 
                pictureContent={picture}
                previusPage={previusPage}></CadastroAnimaisComponent>
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
        flex: 1,
        alignSelf: 'center'
    }
  });