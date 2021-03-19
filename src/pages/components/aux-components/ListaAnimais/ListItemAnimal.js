import React, { Component, useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  ImageBackground, 
  Switch, 
  TouchableOpacity } from "react-native";
import MaterialSwitch from "./MaterialSwitch";
import CupertinoButtonInfo from "./CupertinoButtonInfo";
import api from '../../../../services/api';


const image = { uri: "https://reactjs.org/logo-og.png" };

function ListItemAnimal({animal}, ...props) {

  let isAnimalPerdido = new Boolean(animal.isPerdido);
  const [isEnabled, setIsEnabled] = useState();

  setIsEnabledManual(isAnimalPerdido)

  function setIsEnabledManual(){
    setIsEnabled(isAnimalPerdido);
  }

  console.log('============')
  console.log('Animal: ' + animal.name)
  console.log('isPerdido: ' + isAnimalPerdido)
  console.log('============')

  function toggleSwitch() {
    const id_animal  = animal.id_animal;
    setIsEnabled(previousState => !previousState);
    
    try{
      if (!isEnabled){
        api.post('setAnimalIsPerdido', { id_animal, isEnabled })
        .then(console.log('Animal Perdido'))
        .catch((err)=>alert(err))
      } 
      else {
        api.post('setAnimalIsPerdido', { id_animal, isEnabled })
        .then(console.log('Animal Seguro'))
        .catch((err)=>alert(err))
      }
    } catch (err) {
        alert(err);
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>
        <Text style={styles.nomeDoAnimal}>{animal.name}</Text>
        <View
          style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>Declarar como perdido</Text>
            <Switch 
              style={styles.materialSwitch}
              onValueChange={toggleSwitch}
              value={isEnabled}>
            </Switch>
        </View>
        <View>
          <ImageBackground 
            source={image}
            style={{height: 300}}>
          </ImageBackground>
        </View>
        <CupertinoButtonInfo
          caption="Declarar ponto no mapa"
          disabled={isEnabled}
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
    backgroundColor: "#E6E6E6"
  },
  nomeDoAnimal: {
    fontSize: 30,
    color: "#121212",
    marginTop: 21,
    marginLeft: 26
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

export default ListItemAnimal;
