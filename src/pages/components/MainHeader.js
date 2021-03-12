import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

function MainHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <SafeAreaView style={styles.rect}>
        <Text style={styles.title}>{props.title}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.23,
    shadowRadius: 0
  },
  rect: {
    backgroundColor: "rgba(94,53,177,1)",
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: '100%'
  },
  title: {
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    marginTop: 40
  }
});

export default MainHeader;
