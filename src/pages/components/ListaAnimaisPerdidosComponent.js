import React, { Component, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//componentes
import ListItemAnimalPerdidos from './aux-components/ListaAnimaisPerdidos/ListItemAnimalPerdidos';

let id_user;
let aAnimal_ids = [];

export default class ListaAnimaisComponent extends React.Component {
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
            const response = await api.get('getLostAnimals')
            console.log('response: ' + response.data) 
            
            console.log(aAnimal_ids)
            for (let i=0; i<response.data.length; i++) {
                let oAnimal = response.data[i];
                
                if(!(aAnimal_ids.includes(oAnimal.id_animal))){
                    aAnimal_ids.push(oAnimal.id_animal)
                    this.handleSetState(oAnimal);
                }

                // console.log('teste 1: '+ this.state.animals)
                // if(this.state.animals){ //Caso tela já possua registros
                //     console.log('if acessado')
                //     this.state.animals.forEach(animal => { // verifique para cada registro da tela
                //         console.log('teste 2: '+oAnimal.id_animal)
                //         console.log('teste 3: '+animal.id_animal)
                //         if(oAnimal.id_animal === animal.id_animal){ // se o registro buscado do banco está ou não sendo exibido
                //             this.handleSetState(oAnimal);
                //         }
                //     });
                // } else {
                //     console.log('else acessado')
                //     this.handleSetState(oAnimal);
                // }
            }        
        } catch (err) {
            alert(err)
        }
    }

    async handleSetState(oAnimal) {
        console.log('teste 4' + oAnimal)
        this.setState({
            animals: [...this.state.animals, 
                {
                    key: oAnimal.id_animal,
                    id_animal: oAnimal.id_animal,
                    specie: oAnimal.specie,
                    name: oAnimal.name,
                    race:  oAnimal.race,
                    size: oAnimal.size,
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

    handleRefresh = () => {
        this.atualizarRegistros();
    }

    render () {
        return (
            <View style={{flex:2}}>
                <FlatList 
                    data={this.state.animals}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    renderItem={({item}) =>  
                            <View>
                                <ListItemAnimalPerdidos animal={item}/>
                            </View>
                        }
                />
                <View style={{marginBottom: 100}}></View>
            </View>
        );  
    }

}