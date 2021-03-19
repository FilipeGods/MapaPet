import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo({disabled, ...props}) {
  return (
    <TouchableOpacity 
      style={!disabled ? styles.containerDesativado : styles.containerAtivado}
      disabled={!disabled}>
      <Text style={styles.caption}>{props.caption || "Button"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerAtivado: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    height: 44,
    width: 246,
    marginTop: 25,
    marginBottom:25,
    marginLeft: 90
  },
  containerDesativado: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    height: 44,
    width: 246,
    marginTop: 25,
    marginBottom:25,
    marginLeft: 90
  },
  caption: {
    color: "#fff",
    fontSize: 17
  }
});

export default CupertinoButtonInfo;
