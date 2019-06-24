import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { CIRCLE_VALUE, NEUTRAL_VALUE } from "../constants/game";

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
  winnerCube: {
    backgroundColor: "green"
  },
  image: {
    width: "90%",
    height: "90%"
  }
});

export default function Cube({
  isMovable,
  handlePress,
  isSelected,
  isWinning,
  value
}) {
  let cubeStyle = styles.cube;
  if (isSelected) {
    cubeStyle = { ...cubeStyle, ...styles.selectedCube };
  }
  if (isWinning) {
    cubeStyle = { ...cubeStyle, ...styles.winnerCube };
  }

  const logo = value === CIRCLE_VALUE ? circle : cross;
  const image =
    value !== NEUTRAL_VALUE ? (
      <Image source={logo} style={styles.image} />
    ) : null;

  if (isMovable) {
    return (
      <TouchableOpacity
        style={{ ...styles.cube, ...styles.movable }}
        onPress={handlePress}
      >
        {image}
      </TouchableOpacity>
    );
  }
  return <View style={cubeStyle}>{image}</View>;
}
