import { AsyncStorage } from "react-native";

import {
  getNewGame,
  getMovables,
  postSelectCube,
  postMoveCube,
  getMyTeam,
  getExistingGame
} from "../apiRequests";
import {
  CREATE_GAME,
  UPDATE_GAME,
  FETCH_MOVABLES,
  SELECT_CUBE_REPLY,
  FETCH_TEAM_REPLY
} from "../game/constants";
import { CIRCLE_VALUE } from "../constants/game";

const storeMyTeam = async (team, id) =>
  await AsyncStorage.setItem(`@Quixo-game-${id}`, team.toString());

const getTeamFromStorage = async id =>
  await AsyncStorage.getItem(`@Quixo-game-${id}`);

export const fetchMyTeam = (id, dispatch) => () => {
  const fetchTeamCall = async () => {
    const team = await getTeamFromStorage(id);
    if (team !== null) {
      return dispatch({
        type: FETCH_TEAM_REPLY,
        payload: { team: parseInt(team) }
      });
    }
    const payload = await getMyTeam(id);
    if (payload && payload.team) {
      storeMyTeam(payload.team, id);
      dispatch({ type: FETCH_TEAM_REPLY, payload });
    }
  };
  if (id) {
    fetchTeamCall();
  }
};

export const fetchGame = (id, dispatch) => () => {
  const fetchNewGameCall = async () => {
    const payload = await getNewGame();
    dispatch({ type: CREATE_GAME, payload });
  };
  const fetchExistingGameCall = async id => {
    const payload = await getExistingGame(id);
    dispatch({ type: UPDATE_GAME, payload });
  };
  if (!id) {
    fetchNewGameCall();
  } else {
    fetchExistingGameCall(id);
  }
};

export const fetchMovables = (id, dispatch) => () => {
  const fetchMovablesCall = async () => {
    const payload = await getMovables(id);
    dispatch({ type: FETCH_MOVABLES, payload });
  };
  if (id) {
    fetchMovablesCall();
  }
};

export const selectCube = (id, dispatch) => ({ x, y }) => {
  const selectCubeCall = async () => {
    const payload = await postSelectCube({ id, x, y });
    dispatch({ type: SELECT_CUBE_REPLY, payload });
  };
  selectCubeCall();
};

export const moveCube = (id, dispatch) => ({ x, y }) => {
  const moveCubeCall = async () => {
    const payload = await postMoveCube({ id, x, y });
    dispatch({ type: UPDATE_GAME, payload });
  };
  moveCubeCall();
};

export const refreshGame = (id, isPlaying, dispatch) => () => {
  const refreshGameCall = async () => {
    const payload = await getExistingGame(id);
    dispatch({ type: UPDATE_GAME, payload });
  };
  let intervalId;
  if (!isPlaying && id) {
    intervalId = setInterval(refreshGameCall, 1000);
  }
  return () => clearInterval(intervalId);
};
