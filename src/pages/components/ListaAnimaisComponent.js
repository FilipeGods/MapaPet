import React, { Component, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
let USUARIO = require('../../services/globalUserController.json');

//componentes
import ListItemAnimal from './aux-components/ListaAnimais/ListItemAnimal'

export default function ListaAnimalComponent (props) {

    return (
        <View>
            <FlatList 
                data={[
                    {name: 'Devin'},
                    {name: 'Dan'},
                    {name: 'Dominic'},
                    {name: 'Jackson'},
                    {name: 'James'},
                    {name: 'Joel'},
                    {name: 'John'},
                    {name: 'Jillian'},
                    {name: 'Jimmy'},
                    {name: 'Julie'},
                  ]}
                  renderItem={({item}) => 
                    <View>
                        <ListItemAnimal animal={item}/>
                    </View>}
            />
        </View>
    );


}