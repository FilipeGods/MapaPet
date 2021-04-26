import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

 
//COMPONENTS
import CameraComponent from '../components/CameraComponent';

export default function Camera() {
    return (
        <View style={styles.container}>
            <CameraComponent style={styles.loginComponent}></CameraComponent>
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
    loginComponent: {
        flex: 5,
        alignSelf: 'center',
        zIndex: 1
    }
  });