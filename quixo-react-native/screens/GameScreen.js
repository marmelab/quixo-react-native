import React, { useReducer, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { reducer, initialState } from "../game/reducer";
import Cube from "../components/Cube";
import {
  fetchGame,
  fetchMovables,
  selectCube,
  moveCube,
  fetchMyTeam,
  refreshGame
} from "../game/actions";
import { CIRCLE_VALUE, NEUTRAL_VALUE } from "../constants/game";

const circle = require("../assets/circle.png");
const cross = require("../assets/cross.png");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  board: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4682B4",
    width: "100%",
    height: "70%"
  },
  row: {
    justifyContent: "center",
    flexDirection: "row"
  },
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
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15
  },
  footerInstructions: {
    height: "5%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  teamInstruction: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const isInMovables = movables => ({ x, y }) =>
  movables.some(cube => cube.x === x && cube.y === y);

const isSelectedCube = selectedCube => ({ x, y }) =>
  selectedCube && selectedCube.x === x && selectedCube.y === y;

const isMyTurn = (myTeam, currentPlayer) => myTeam === currentPlayer;

const getInstructions = (team, isPlaying) => {
  const isSpectator = team === NEUTRAL_VALUE;
  if (isSpectator) {
    return (
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>You're a spectator </Text>
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

const GameScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { game, movables, myTeam } = state;
  const id = game.id || navigation.getParam("id", null);
  const isPlaying = isMyTurn(myTeam, game.currentPlayer);

  useEffect(refreshGame(id, isPlaying, dispatch), null);
  useEffect(fetchGame(id, dispatch), []);
  useEffect(fetchMovables(id, dispatch), [game.currentPlayer]);
  useEffect(fetchMyTeam(id, dispatch), [game.id]);

  const handlePressCube = game.selectedCube
    ? ({ x, y }) => moveCube(id, dispatch)({ x, y })
    : ({ x, y }) => selectCube(id, dispatch)({ x, y });
  const isMovable = isPlaying ? isInMovables(movables) : () => false;
  const isSelected = isSelectedCube(game.selectedCube);

  return (
    <View style={styles.container}>
      {getInstructions(myTeam, isPlaying)}
      <View style={styles.board}>
        {game.board.map((row, x) => (
          <View key={`row-${x}`} style={styles.row}>
            {row.map((value, y) => (
              <Cube
                key={`cube-${x}-${y}`}
                isMovable={isMovable({ x, y })}
                isSelected={isSelected({ x, y })}
                handlePress={() => handlePressCube({ x, y })}
                value={value}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.footerInstructions}>
        <Text style={styles.instructionsText}>ID: {game.id}</Text>
      </View>
    </View>
  );
};

export default GameScreen;
