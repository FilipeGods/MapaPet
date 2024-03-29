import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

 
//COMPONENTS
import MainHeader from '../components/MainHeader';
import ListaAnimaisComponent from '../components/ListaAnimaisComponent';

export default function listaAnimais({navigation}) {

    //const navigation = useNavigation();

    React.useEffect(
        () => navigation.addListener('focus', () => {
              
        }),
        []
      );


    return (
        <View style={styles.container}>
            <ListaAnimaisComponent navigation={navigation} style={styles.ListaAnimaisComponent}></ListaAnimaisComponent>
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