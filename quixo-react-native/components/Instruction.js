import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { CIRCLE_VALUE, NEUTRAL_VALUE } from "../constants/game";

const circle = require("../assets/circle.png");
const cross = require("../assets/cross.png");

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    aspectRatio: 1,
    margin: 10
  },
  instructions: {
    height: "25%",
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 30
  },
  instructionsText: {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18
  },
  teamInstruction: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const Instructions = ({ team, isPlaying, winner }) => {
  const isSpectator = team === NEUTRAL_VALUE;
  if (winner) {
    return (
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          {`${winner === 1 ? "Player 1" : "Player 2"} has won the game !`}
        </Text>
      </View>
    );
  }

  if (isSpectator) {
    return (
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>{"You're"} a spectator </Text>
      </View>
    );
  }

  const logo = team === CIRCLE_VALUE ? circle : cross;
  return (
    <View style={styles.instructions}>
      <View style={styles.teamInstruction}>
        <Text style={styles.instructionsText}>You're playing with </Text>
        <Image source={logo} style={styles.image} />
      </View>
      <Text style={styles.instructionsText}>
        {isPlaying ? "Your turn !" : "Waiting for the opponent..."}
      </Text>
    </View>
  );
};

export default Instructions;
