import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

 
//COMPONENTS
import MainHeader from '../components/MainHeader';
import ListaAnimaisPerdidosComponent from '../components/ListaAnimaisPerdidosComponent';

export default function listaAnimais() {
    return (
        <View style={styles.container}>
            <ListaAnimaisPerdidosComponent style={styles.ListaAnimaisComponent}></ListaAnimaisPerdidosComponent>
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