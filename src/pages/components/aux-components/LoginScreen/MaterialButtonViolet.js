import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";



function MaterialButtonViolet({onPress, style,...props}) { // onPress é especificado por qm chama esse componente e ...props trata qualquer propriedade que for especificada para o componente
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.container, style]}
      {...props}>
      <Text style={styles.caption}>{props.caption || "BUTTON"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  }, 
  caption: {
    color: "black",
    fontSize: 14
  }
});

export default MaterialButtonViolet;
