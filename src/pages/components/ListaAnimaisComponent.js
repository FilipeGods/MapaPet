import React, { Component, useState } from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//componentes
import ListItemAnimal from './aux-components/ListaAnimais/ListItemAnimal';

export default class ListaAnimaisComponent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            animals: []
        }
    }

    

    async componentDidMount(){
        let id_user = USUARIO.id_user;
        
        try{
            const response = await api.post('getMyAnimals', { id_user })
            console.log('response: ' + response.data) 
            
            for (let i=0; i<response.data.length; i++) {
                let oAnimal = response.data[i];

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
        } catch (err) {
            alert(err)
        }
    }

    render () {
        return (
            <View style={{flex:2}}>
                <FlatList 
                    data={this.state.animals}
                    renderItem={({item}) => 
                            <View>
                                <ListItemAnimal animal={item}/>
                            </View>
                        }
                />
                <View style={{marginBottom: 100}}></View>
            </View>
        );  
    }

}