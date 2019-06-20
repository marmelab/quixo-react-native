import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  cube: {
    flex: 1,
    height: 60,
    width: 60,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 10
  },
  movable: {
    borderColor: "green"
  },
  selectedCube: {
    borderColor: "white"
  }
});

export default function Cube({ isMovable, pressCube, isSelected }) {
  const cubeStyle = isSelected
    ? { ...styles.cube, ...styles.selectedCube }
    : styles.cube;
  if (isMovable) {
    return (
      <TouchableOpacity
        style={{ ...styles.cube, ...styles.movable }}
        onPress={pressCube}
      />
    );
  }
  return <View style={cubeStyle} />;
}
