import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonWithVioletText1({onPress, style,...props}) {
  return (
    <TouchableOpacity
      onPress={onPress} 
      style={[styles.container, props.style]}
      {...props}>
      <Text style={styles.caption}>{props.caption || "BUTTON"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  caption: {
    color: "#3F51B5",
    fontSize: 14
  }
});

export default MaterialButtonWithVioletText1;
