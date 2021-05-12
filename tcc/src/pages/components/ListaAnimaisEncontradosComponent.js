import React, { Component, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//componentes
import ListItemAnimal from './aux-components/ListaAnimais/ListItemAnimal';


let id_user;
let aAnimal_ids = [];
let isLoading;

export default class ListaAnimaisEncontradosComponent extends React.Component {
    

    constructor(props){
        super(props)

        this.state = {
            animals: [],
            refreshing: false,
        }
    }

    async componentDidMount(){
        id_user = USUARIO.id_user;
        aAnimal_ids = [];
        this.atualizarRegistros();
    }

    async atualizarRegistros(){
        try{
            const response = await api.post('getMyFoundAnimals', { id_user })
            
            this.state.animals = [];
            for (let i=0; i<response.data.length; i++) {
                let oAnimal = response.data[i];
                this.handleSetState(oAnimal);
            }        
        } catch (err) {
            alert(err)
        }
    }

    async handleSetState(oAnimal) {
        this.setState({
            animals: [...this.state.animals, 
                {
                    key: oAnimal.id_animal,
                    id_animal: oAnimal.id_animal,
                    specie: oAnimal.specie,
                    name: oAnimal.name,
                    race:  oAnimal.race,
                    size: oAnimal.size,
                    picture: oAnimal.picture,
                    description: oAnimal.description,
                    isPerdido: oAnimal.isPerdido,
                    fk_id_user: oAnimal.fk_id_user,
                    fk_id_marker: oAnimal.fk_id_marker,
                    created_at: oAnimal.created_at,
                    updated_at: oAnimal.updated_at
                }
            ] 
        });
    }

    funcaoTeste = () => {
        console.log('isso é um teste')
    }

    handleRefresh = () => {
        this.atualizarRegistros();
    }

    handleNavigationCadastrarAnimal = () => {
        
        //this.props.navigation.navigate('CadastrarAnimal', {previusPage: 'ListaAnimais'})
    }

    render () {
        const { navigation } = this.props;
        
        return (
            <View style={{flex:1}}>
                <FlatList 
                    data={this.state.animals}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    renderItem={({item}) => 
                            <View>
                                <ListItemAnimal animal={item} handleRefresh={this.handleRefresh}/>
                            </View>
                        }
                />
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CadastrarAnimal')
                            USUARIO.lastPage = "AnimaisEncontrados"
                        }}>
                        <View style={styles.addButton}>
                            <MaterialIcons   
                                name="add"
                                size={32}/>
                        </View>    
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 90}}></View>
            </View>
        );  
    }

}

const styles = StyleSheet.create({
    footer:{
      borderTopWidth:1,  
      borderColor: "#D9D5DC",
      backgroundColor: "transparent",
      alignItems: "center"
    },
    addButton:{
        marginTop:10
    }
});