import React, { useReducer, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { reducer, initialState } from "../game/reducer";
import Cube from "../components/Cube";
import Instructions from "../components/Instruction";
import {
  fetchGame,
  fetchMovables,
  selectCube,
  moveCube,
  fetchMyTeam,
  refreshGame
} from "../game/actions";

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
  }
});

const isInMovables = movables => ({ x, y }) =>
  movables.some(cube => cube.x === x && cube.y === y);

const isSelectedCube = selectedCube => ({ x, y }) =>
  selectedCube && selectedCube.x === x && selectedCube.y === y;

const isWinningCube = winningLine => ({ x, y }) =>
  (winningLine || []).some(line => line.x === x && line.y === y);

const isMyTurn = (myTeam, currentPlayer) => myTeam === currentPlayer;

const GameScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { game, movables, myTeam } = state;
  const {
    id: gameId,
    board,
    currentPlayer,
    selectedCube,
    winner,
    winningLine
  } = game;

  const id = gameId || navigation.getParam("id", null);
  const isSolo = navigation.getParam("solo", false);
  const isPlaying = isMyTurn(myTeam, currentPlayer);

  useEffect(refreshGame(id, isPlaying, dispatch), null);
  useEffect(fetchGame(id, isSolo, dispatch), []);
  useEffect(fetchMovables(id, dispatch), [currentPlayer]);
  useEffect(fetchMyTeam(id, dispatch), [id]);

  const handlePressCube = selectedCube
    ? ({ x, y }) => () => moveCube(id, dispatch)({ x, y })
    : ({ x, y }) => () => selectCube(id, dispatch)({ x, y });
  const isMovable = isPlaying && !winner ? isInMovables(movables) : () => false;
  const isSelected = isSelectedCube(selectedCube);
  const isWinning = isWinningCube(winningLine);

  return (
    <View style={styles.container}>
      <Instructions team={myTeam} isPlaying={isPlaying} winner={winner} />
      <View style={styles.board}>
        {board.map((row, x) => (
          <View key={`row-${x}`} style={styles.row}>
            {row.map((value, y) => (
              <Cube
                key={`cube-${x}-${y}`}
                isMovable={isMovable({ x, y })}
                isSelected={isSelected({ x, y })}
                isWinning={isWinning({ x, y })}
                handlePress={handlePressCube({ x, y })}
                value={value}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.footerInstructions}>
        <Text style={styles.instructionsText}>ID: {id}</Text>
      </View>
    </View>
  );
};

export default GameScreen;
