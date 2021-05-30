import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
let USUARIO = require('../../services/globalUserController.json'); 
 
//COMPONENTS
import MainHeader from '../components/MainHeader';
import ListaAnimaisEncontreiComponent from '../components/ListaAnimaisEncontreiComponent';

//let isVisible;
export default function listaAnimaisEncontrei({navigation}) {
    
    //const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState('');
    
    React.useEffect(
        () => navigation.addListener('focus', () => {
            setIsVisible(true);
        }),
        []
    );

    React.useEffect(
        () => navigation.addListener('blur', () => {
            setIsVisible(false);
        }),
        []
    );


    return (
        <View style={styles.container}>
            <ListaAnimaisEncontreiComponent 
                navigation={navigation} 
                isVisible={isVisible}
                style={styles.ListaAnimaisComponent}>
            </ListaAnimaisEncontreiComponent>
        </View>
        );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    MainHeader: {
        flex: 2,
        zIndex: 5
    },
    ListaAnimaisComponent: {
        flex: 5,
        alignSelf: 'center',
        zIndex: 1
    }
  });