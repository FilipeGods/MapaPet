import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import TextInputMask from 'react-native-text-input-mask';

function MaterialUnderlineTextbox({onChangeText, ...props}) {
  console.log(props)
  return (
    <View style={[styles.container, props.style]}>
      <TextInputMask
        onChangeText={onChangeText}
        placeholder={props.inputStyle || "Placeholder"}
        style={styles.inputStyle}
      ></TextInputMask>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 16,
    paddingBottom: 8
  }
});

export default MaterialUnderlineTextbox;
