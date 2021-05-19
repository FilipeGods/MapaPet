import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

 
import ListaAnimaisEncontradosComponent from '../components/ListaAnimaisEncontradosComponent';

export default function listaAnimaisEncontrados() {
    return (
        <View style={styles.container}>
            <ListaAnimaisEncontradosComponent style={styles.ListaAnimaisComponent}></ListaAnimaisEncontradosComponent>
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