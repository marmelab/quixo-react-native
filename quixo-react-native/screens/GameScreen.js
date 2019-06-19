import React, { useReducer, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { reducer, initialState } from "../game/reducer";
import { getNewGame } from "../apiRequests";
import Cube from "../components/Cube";
import { UPDATE_GAME } from "../game/constants";

const styles = StyleSheet.create({
  board: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    justifyContent: "center",
    flexDirection: "row"
  }
});

const getBoard = board =>
  board.map((row, rowIndex) => {
    const cubes = row.map((cube, colIndex) => <Cube key={colIndex} />);
    return (
      <View key={rowIndex} style={styles.row}>
        {cubes}
      </View>
    );
  });

const fetchGame = (id, dispatch) => () => {
  const fetchNewGame = async () => {
    const payload = await getNewGame();
    dispatch({ type: UPDATE_GAME, payload });
  };
  if (!id) {
    fetchNewGame();
  }
};

const GameScreen = ({ navigation }) => {
  const [game, dispatch] = useReducer(reducer, initialState);
  const id = navigation.getParam("id", null) || game.id;
  useEffect(fetchGame(id, dispatch), []);

  return <View style={styles.board}>{getBoard(game.board)}</View>;
};

export default GameScreen;
