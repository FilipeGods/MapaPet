import React, { Component, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  Switch, 
  Alert,
  TouchableOpacity } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CupertinoButtonInfo from "../ListaAnimais/CupertinoButtonInfo";
import api from '../../../../services/api';
import {images} from '../../../../assets/index';


function ListItemAnimalEncontrei(props) {
  let animal = props.animal;

  let isAnimalPerdido = animal.isPerdido ? true : false;
  const id_animal  = animal.id_animal;
  const [isEnabled, setIsEnabled] = useState();
  const navigation = useNavigation();

  // console.log('============')
  // console.log('Animal: ' + animal.name)
  // console.log('isPerdido: ' + isAnimalPerdido)
  // console.log('============')

console.log('animal.picture: ',animal.picture !== null)

  useEffect(() => {
    console.log(isAnimalPerdido)
    setIsEnabled(isAnimalPerdido);
  }, []);

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

  function deletarAnimal(animalId){
    if(animalId){
      api.delete('deleteAnimal/' + animalId)
        .then(props.handleRefresh())
        .catch((err) => {
            alert('Erro ao deletar animal:' + err);
        });
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>      
      <View style={{justifyContent:'space-between', flexDirection:'row'}}>
          <Text style={styles.nomeDoAnimal}>{animal.name}</Text>
          <TouchableOpacity
              style={{paddingTop:20, paddingEnd:30}}
              onPress= {() => {
                  Alert.alert(
                  //title
                  'Remover Animal',
                  //body
                  'Tem certeza que deseja excluir este animal?',
                  [
                      {text: 'Sim', onPress: () => deletarAnimal(animal.id_animal)},
                      {text: 'Não', onPress: () => console.log('No Pressed')}
                  ],
                  { cancelable: true }
                  )
              }}>
              <Ionicons
                  name='trash'
                  size={32}
                  color='red'>
              </Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}></Text>
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

export default ListItemAnimalEncontrei;
