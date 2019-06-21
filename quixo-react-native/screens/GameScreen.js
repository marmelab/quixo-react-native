import React, { useReducer, useEffect } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { reducer, initialState } from "../game/reducer";
import Cube from "../components/Cube";
import {
  fetchGame,
  fetchMovables,
  selectCube,
  moveCube,
  fetchMyTeam
} from "../game/actions";

const styles = StyleSheet.create({
  board: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4682B4"
  },
  row: {
    justifyContent: "center",
    flexDirection: "row"
  }
});

const isInMovables = movables => ({ x, y }) =>
  movables.some(cube => cube.x === x && cube.y === y);

const isSelectedCube = selectedCube => ({ x, y }) =>
  selectedCube && selectedCube.x === x && selectedCube.y === y;

const isMyTurn = (myTeam, currentPlayer) => myTeam === currentPlayer;

const GameScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { game, movables, myTeam } = state;
  const id = game.id || navigation.getParam("id", null);

  useEffect(fetchGame(id, dispatch), []);
  useEffect(fetchMovables(id, dispatch), [game.currentPlayer]);
  useEffect(fetchMyTeam(id, dispatch), [game.id]);

  const isPlaying = isMyTurn(myTeam, game.currentPlayer);
  const handlePressCube = game.selectedCube
    ? ({ x, y }) => moveCube(id, dispatch)({ x, y })
    : ({ x, y }) => selectCube(id, dispatch)({ x, y });
  const isMovable = isPlaying ? isInMovables(movables) : () => false;
  const isSelected = isSelectedCube(game.selectedCube);
  return (
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
  );
};

export default GameScreen;
