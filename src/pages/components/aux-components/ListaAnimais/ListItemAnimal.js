import React, { Component } from "react";
import { StyleSheet, View, Text, ImageBackground, Switch } from "react-native";
import MaterialSwitch from "./MaterialSwitch";
import CupertinoButtonInfo from "./CupertinoButtonInfo";

const image = { uri: "https://reactjs.org/logo-og.png" };

function ListItemAnimal({animal}, ...props) {

  const [isEnabled, setIsEnabled] = useState(false);

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
              onPress={}></Switch>
        </View>
        <View>
          <ImageBackground 
            source={image}
            style={{height: 300}}>
          </ImageBackground>
        </View>
        <CupertinoButtonInfo
          caption="Declarar ponto no mapa"
          style={styles.cupertinoButtonInfo}
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
    height: 25,
    marginLeft: 10
  },
  loremIpsumRow: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 26,
    marginRight: 135
  },
  cupertinoButtonInfo: {
    height: 44,
    width: 246,
    marginTop: 25,
    marginBottom:25,
    marginLeft: 90
  }
});

export default ListItemAnimal;
