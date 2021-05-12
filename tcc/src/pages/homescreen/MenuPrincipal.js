import React, { Component, useEffect, useState,  } from 'react';
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import api from '../../services/api';
import { color } from 'react-native-reanimated';

export default function MenuPrincipal() { 

    return (
        <ScrollView>
            {/* =========================Animais=========================== */}
            <View style={[styles.outterContainer, {backgroundColor: "#26c6da"}]}>
                <Text style={[styles.title, {alignSelf:'center'}]}>Animais</Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}>
                        <Text style={styles.option}>Meus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}>
                        <Text style={styles.option}>Perdidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}>
                        <Text style={styles.option}>Encontrei</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* =========================Mapa=========================== */}
            <View style={[styles.outterContainer, {backgroundColor: "#263238"}]}>
                <Text style={[styles.title, {alignSelf:'center', color:'#ffffff'}]}>Mapa</Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.innerContainer, {backgroundColor: "#651fff"}]}>
                        <Text style={[styles.option, {color:'#ffffff'}]}>visualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <Ionicons color='#ffffff' name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    outterContainer:{
        marginTop:10,
        marginBottom:5,
        borderRadius: 15,
        padding: 16,
        marginHorizontal: 12,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
    },
    innerContainer:{
        marginTop:3,
        marginBottom:3,
        borderRadius: 15,
        padding: 16,
        width:'90%'
    },
    infoButton:{
        alignSelf:'center',

    },
    title: {
        fontSize: 30
    },
    option:{
        alignSelf:'center', 
        fontSize: 20
    }
  });