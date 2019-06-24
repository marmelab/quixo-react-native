import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { CIRCLE_VALUE, NEUTRAL_VALUE, CROSS_VALUE } from "../constants/game";

const circle = require("../assets/circle.png");
const cross = require("../assets/cross.png");
const neutral = require("../assets/neutral.png");

const styles = StyleSheet.create({
  cube: {
    flex: 1,
    height: 70,
    width: 70,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CDCDCD",
    justifyContent: "center",
    alignItems: "center",
    margin: 2
  },
  movable: {
    borderColor: "black"
  },
  winnerCube: {
    borderColor: "green",
    borderWidth: 10
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

const getLogo = value => {
  if (value === CIRCLE_VALUE) {
    return circle;
  }
  if (value === CROSS_VALUE) {
    return cross;
  }
  return neutral;
};

export default function Cube({
  isMovable,
  handlePress,
  isSelected,
  isWinning,
  value
}) {
  const cubeStyle = isWinning
    ? { ...styles.cube, ...styles.winnerCube }
    : styles.cube;

  const logo = getLogo(value);
  const image = !isSelected ? (
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
