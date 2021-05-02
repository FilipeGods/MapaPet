import React, { Component, useState } from 'react';
import { 
    ActivityIndicator,
    StyleSheet, 
    View, 
    FlatList, 
    RefreshControl, 
    Input, 
    TouchableOpacity,
    TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//componentes
import ListItemAnimalPerdidos from './aux-components/ListaAnimaisPerdidos/ListItemAnimalPerdidos';

let id_user;
let aAnimal_ids = [];
let isLoading;

export default class ListaAnimaisPerdidosComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            animals: [],
            refreshing: false,
            campoPesquisa: '',
            isLoading: false
        }
    }

    async componentDidMount(){
        id_user = USUARIO.id_user;
        isLoading = false;
        console.log('id_user: '+id_user)
        aAnimal_ids = [];
        this.atualizarRegistros();
    }

    async atualizarRegistros(){
        try{
            const response = await api.get('getLostAnimals')
            console.log('response: ' + response.data) 
            
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
        isLoading = true;
        console.log('teste 4' + oAnimal)

        try {
            const response = await api.post('user', { id_user })
            console.log('user response: ' + response.data[1]) 
            
            let oUser = response.data[0];
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
                        updated_at: oAnimal.updated_at,
                        user: {
                            key: oUser.id_user,
                            id_user: oUser.id_user,
                            name: oUser.name,
                            email: oUser.email,
                            cellphone:  oUser.cellphone,
                            password: oUser.password
                        }
                    }
                ] 
            });
        } catch (err) {
            alert(err)
        }
        
    }

    handleRefresh = () => {
        if(this.state.campoPesquisa)
            this.handleSearchCampoPesquisa();
        else
            this.atualizarRegistros();
    }

    handleClearCampoPesquisa = () => {
        console.log('limpando')
        this.setState( {campoPesquisa: null} );
        this.atualizarRegistros();
    }

    async handleSearchCampoPesquisa() {
        let campoPesquisa = this.state.campoPesquisa;
        console.log('teste: '+campoPesquisa)
        try{
            const response = await api.post('getLostAnimal', {id_user, campoPesquisa} )

            this.state.animals = [];
            for (let i=0; i<response.data.length; i++) {
                let oAnimal = response.data[i];
                this.handleSetState(oAnimal);
            }  
        } catch (err) {
            alert(err)
        }
        
    }

    isDisabled() {
        let campoPesquisa = this.state.campoPesquisa;
        console.log(campoPesquisa)
        if(campoPesquisa) 
            //console.log('true')
            return false
        else
            //console.log('false')
            return true 
    }

    render () {
        return (
            <View style={{flex:1}}>
                <View style={styles.header}>
                    { (true) && //condição para ocultar elemente da tela
                        <View>
                            <TouchableOpacity
                                onPress={() => this.handleSearchCampoPesquisa()}>
                                <View>
                                    <MaterialIcons   
                                        name="search"
                                        size={32}/>
                                </View>    
                            </TouchableOpacity>
                        </View>
                    }
                    <TextInput 
                        placeholder='Nome ou Código'
                        style={styles.inputStyle}
                        onChangeText={(campoPesquisa) => {this.setState({campoPesquisa})}}
                        onSubmitEditing={() => this.handleSearchCampoPesquisa()}
                        value={this.state.campoPesquisa}>
                        </TextInput>
                    { (true) && //condição para ocultar elemente da tela 
                        <View>
                            <TouchableOpacity
                                activeOpacity={this.isDisabled() ? 1 : 0}>
                                <MaterialIcons 
                                    name='cancel'
                                    size={32}
                                    onPress={() => this.handleClearCampoPesquisa()}
                                    disabled={this.isDisabled()}
                                    color={this.isDisabled() ? 'grey' : 'black'}/>
                            </TouchableOpacity> 
                        </View>
                    }    
                </View>
                    <FlatList 
                        progressViewOffset={5}
                        data={this.state.animals}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                        renderItem={({item}) =>  
                                <View>
                                    <ListItemAnimalPerdidos animal={item}/>
                                </View>
                            }
                    />
                <View style={{marginBottom: 90}}></View>
            </View>
        );  
    }

}

const styles = StyleSheet.create({
    header: {
      borderBottomWidth: 1,
      borderColor: "#D9D5DC",
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center"
    },
    footer:{
      borderTopWidth:1,  
      borderColor: "#D9D5DC",
      backgroundColor: "transparent",
      alignItems: "center"
    },
    inputStyle: {
      color: "#000",
      paddingRight: 5,
      fontSize: 20,
      textAlign: 'center',
      alignSelf: "center",
      flex: 1,
      lineHeight: 16,
      paddingTop: 16,
      paddingBottom: 8,
    }
  });