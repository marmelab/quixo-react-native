import React, { useReducer, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { reducer, initialState } from "../game/reducer";
import Cube from "../components/Cube";
import {
  getNewGame,
  getMovables,
  postSelectCube,
  postMoveCube
} from "../apiRequests";
import {
  UPDATE_GAME,
  FETCH_MOVABLES,
  SELECT_CUBE_REPLY
} from "../game/constants";

const styles = StyleSheet.create({
  board: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003366"
  },
  row: {
    justifyContent: "center",
    flexDirection: "row"
  }
});

const isInMovables = movables => ({ x, y }) =>
  movables.filter(cube => cube.x === x && cube.y === y).length > 0;

const isSelectedCube = selectedCube => ({ x, y }) =>
  selectedCube && selectedCube.x === x && selectedCube.y === y;

const fetchGame = (id, dispatch) => () => {
  const fetchGameCall = async () => {
    const payload = await getNewGame();
    dispatch({ type: UPDATE_GAME, payload });
  };
  if (!id) {
    fetchGameCall();
  }
};

const fetchMovables = (id, dispatch) => () => {
  const fetchMovablesCall = async () => {
    const payload = await getMovables(id);
    dispatch({ type: FETCH_MOVABLES, payload });
  };
  if (id) {
    fetchMovablesCall();
  }
};

const selectCube = (id, dispatch) => ({ x, y }) => {
  const selectCubeCall = async () => {
    const payload = await postSelectCube({ id, x, y });
    dispatch({ type: SELECT_CUBE_REPLY, payload });
  };
  selectCubeCall();
};

const moveCube = (id, dispatch) => ({ x, y }) => {
  const moveCubeCall = async () => {
    const payload = await postMoveCube({ id, x, y });
    dispatch({ type: UPDATE_GAME, payload });
  };
  moveCubeCall();
};

const GameScreen = ({ navigation }) => {
  const [{ game, movables }, dispatch] = useReducer(reducer, initialState);
  const id = navigation.getParam("id", null) || game.id;
  useEffect(fetchGame(id, dispatch), []);
  useEffect(fetchMovables(id, dispatch), [game.currentPlayer]);

  const onCubePress = game.selectedCube
    ? moveCube(id, dispatch)
    : selectCube(id, dispatch);
  const isMovable = isInMovables(movables);
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
              pressCube={() => onCubePress({ x, y })}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default GameScreen;
