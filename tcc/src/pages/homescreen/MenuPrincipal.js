import React, { Component, useEffect, useState,  } from 'react';
import { 
    View, 
    StyleSheet, 
    ScrollView, 
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import api from '../../services/api';
import { color } from 'react-native-reanimated';


function handleInfoMeus () {
    Alert.alert(
        //title
        'Meus Animais',
        //body
        'A lista de Meus Animais é utilizada para visualizar os animais que são... Ora, Seus! '+
        'Utilize essa lista para registrar seus animais, e caso esteja procurando por eles, você ' +
        'pode declara-lós como perdidos, assim outros usuários poderam te ajudar a recuperá-lo!',
        [
            {text: 'Fechar', onPress: () => console.log('No Pressed')}
        ],
        { cancelable: true }
        )
}

function handleInfoPerdidos () {
    Alert.alert(
        //title
        'Animais Perdidos',
        //body
        'Na lista de Animais Perdidos, você poderá ver diversos animais que se perderam e precisam '+
        'voltar para seus donos! Quem sabe você não sabe onde algum deles se encontra?',
        [
            {text: 'Fechar', onPress: () => console.log('No Pressed')}
        ],
        { cancelable: true }
        )
}

function handleInfoEncontrei () {
    Alert.alert(
        //title
        'Encontrei',
        //body
        'Utilize a lista Encontrei para registrar animais que você encontrou '+
        'e que precisam ser devolvidos aos seus donos!',
        [
            {text: 'Fechar', onPress: () => console.log('No Pressed')}
        ],
        { cancelable: true }
        )
}

function handleInfoEncontrados () {
    Alert.alert(
        //title
        'Encontrados',
        //body
        'Na lista de Animais Encontrados, você poderá ver diversos animais que foram encontrados '+
        'por nossos usuários! Talvez seu animal já tenha sido recuperado e esteja esperando por você!',
        [
            {text: 'Fechar', onPress: () => console.log('No Pressed')}
        ],
        { cancelable: true }
        )
}

function handleInfoMapa () {
    Alert.alert(
        //title
        'Mapa',
        //body
        'Utilize o mapa para visualizar pontos onde animais animais perdidos podem ser encontrados! '+
        'Talvez algum deles possa estar perto de você!',
        [
            {text: 'Fechar', onPress: () => console.log('No Pressed')}
        ],
        { cancelable: true }
        )
}

export default function MenuPrincipal() { 
    const navigation = useNavigation();

    return (
        <ScrollView>
            {/* =========================Animais=========================== */}
            <View style={[styles.outterContainer, {backgroundColor: "#26c6da"}]}>
                <Text style={[styles.title, {alignSelf:'center'}]}>Animais</Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}
                        onPress={() => navigation.navigate('listaAnimais')}>
                        <Text style={styles.option}>Meus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.infoButton}
                        onPress={handleInfoMeus}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}
                        onPress={() => navigation.navigate('listaAnimaisPerdidos')}>
                        <Text style={styles.option}>Perdidos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.infoButton}
                        onPress={handleInfoPerdidos}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}
                        onPress={() => navigation.navigate('listaAnimaisEncontrei')}>
                        <Text style={styles.option}>Encontrei</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.infoButton}
                        onPress={handleInfoEncontrei}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.innerContainer, {backgroundColor: "#6ff9ff"}]}
                        onPress={() => navigation.navigate('listaAnimaisEncontrados')}>
                        <Text style={styles.option}>Encontrados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.infoButton}
                        onPress={handleInfoEncontrados}>
                        <Ionicons name='information-circle' size={40}/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* =========================Mapa=========================== */}
            <View style={[styles.outterContainer, {backgroundColor: "#263238"}]}>
                <Text style={[styles.title, {alignSelf:'center', color:'#ffffff'}]}>Mapa</Text>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.innerContainer, {backgroundColor: "#651fff"}]}
                        onPress={() => navigation.navigate('Mapa')}>
                        <Text style={[styles.option, {color:'#ffffff'}]}>visualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.infoButton}
                        onPress={handleInfoMapa}>
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