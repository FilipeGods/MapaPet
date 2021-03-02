import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

 
//COMPONENTS
import MainHeader from '../components/MainHeader';
import LoginComponent from '../components/LoginComponent';

export default function Login() {
    return (
        <View style={styles.container}>
            <MainHeader 
            title="Bem-vindo"
            style={styles.MainHeader}></MainHeader>
            <LoginComponent style={styles.loginComponent}></LoginComponent>
        </View>
        );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    MainHeader: {
        flex: 2,
        zIndex: 5
    },
    loginComponent: {
        flex: 5,
        alignSelf: 'center',
        zIndex: 1
    }
  });