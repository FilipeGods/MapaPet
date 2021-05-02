import React, { Component, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  Switch, 
  TouchableOpacity } from "react-native";
import CupertinoButtonInfo from "../ListaAnimais/CupertinoButtonInfo";
import api from '../../../../services/api';
import {images} from '../../../../assets/index';


function ListItemAnimalPerdidos({animal}, ...props) {

  let isAnimalPerdido = animal.isPerdido ? true : false;
  const id_animal  = animal.id_animal;
  const [isEnabled, setIsEnabled] = useState();

  //é disparado toda vez que o componente é atualizado
  useEffect(() => {
    console.log(isAnimalPerdido)
    setIsEnabled(isAnimalPerdido);
  }, []);

  // é disparado toda vez que isEnabled é alterado 
  useEffect(() => {
    console.log(animal.name +': ' + isEnabled)
    if(isEnabled != undefined){
      if (isEnabled){
        api.post('setAnimalIsPerdido', { id_animal, isEnabled })
        .then(console.log('Animal Perdido'))
        .catch((err)=>alert(err))
      } 
      else {
        api.post('setAnimalIsPerdido', { id_animal, isEnabled })
        .then(console.log('Animal Seguro'))
        .catch((err)=>alert(err))
      }
    }  
  }, [isEnabled]);

  function toggleSwitch() {
    setIsEnabled(previousState => !previousState);
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>      
        <Text style={styles.nomeDoAnimal}>{animal.name}</Text>
        <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>Perdido em: {animal.lostDate}</Text>
        </View>
        <View>
        { (animal.picture === null) &&
            <ImageBackground 
              source={images.pata}
              style={{height: 300}}>
            </ImageBackground>
          }
          { (animal.picture !== null) &&
            <ImageBackground 
              source={{uri: animal.picture}}
              style={{height: 300}}>
            </ImageBackground>
          }
        </View>
        <View style={styles.rect2}>
            <Text style={styles.loremIpsum}>Email: {animal.user.email}</Text>
            <Text style={styles.loremIpsum}>Celular: {animal.user.cellphone}</Text>
        </View>
        <CupertinoButtonInfo
          caption="Visualizar no Mapa"
          disabled={true}
        ></CupertinoButtonInfo>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 25
  },
  rect: {
    backgroundColor: "#E6E6E6",
    width: '100%',
  },
  rect2: {
    marginTop: 15,
    marginLeft: 26,
    marginRight: 135,
    marginBottom: -15
  },
  nomeDoAnimal: {
    fontSize: 30,
    color: "#121212",
    marginTop: 21,
    marginLeft: 26
  },
  contatoTitle: {
    fontSize: 25,
    color: "#121212",
    marginTop: 21,
    marginLeft: 50
  },
  loremIpsum: {
    color: "#121212",
    fontSize: 20,
    marginTop: 3,
    marginBottom: 10
  },
  materialSwitch: {
    width: 45,
    height: 36,
    marginLeft: 2
  },
  loremIpsumRow: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 26,
    marginRight: 135
  }
});

export default ListItemAnimalPerdidos;
