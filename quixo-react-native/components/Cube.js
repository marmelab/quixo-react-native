import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  cube: {
    flex: 1,
    height: 60,
    width: 60,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 10
  }
});

export default function Cube() {
  return <View style={styles.cube} />;
}
