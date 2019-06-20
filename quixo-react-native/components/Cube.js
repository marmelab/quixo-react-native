import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

const CROSS_VALUE = 1;
const CIRCLE_VALUE = -1;

const circle = require("../assets/circle.png");
const cross = require("../assets/cross.png");

const styles = StyleSheet.create({
  cube: {
    flex: 1,
    height: 60,
    width: 60,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#CDCDCD",
    justifyContent: "center",
    alignItems: "center"
  },
  movable: {
    borderColor: "#00FF7F"
  },
  selectedCube: {
    borderColor: "#8B008B"
  },
  image: {
    width: "90%",
    height: "90%"
  }
});

export default function Cube({
  isMovable,
  handlePressCube,
  isSelected,
  value
}) {
  const cubeStyle = isSelected
    ? { ...styles.cube, ...styles.selectedCube }
    : styles.cube;

  const logo = value === CIRCLE_VALUE ? circle : cross;
  const image =
    value !== 0 ? <Image source={logo} style={styles.image} /> : null;

  if (isMovable) {
    return (
      <TouchableOpacity
        style={{ ...styles.cube, ...styles.movable }}
        onPress={handlePressCube}
      >
        {image}
      </TouchableOpacity>
    );
  }
  return <View style={cubeStyle}>{image}</View>;
}
