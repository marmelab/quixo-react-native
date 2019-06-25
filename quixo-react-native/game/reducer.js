import {
  UPDATE_GAME,
  FETCH_MOVABLES,
  SELECT_CUBE_REPLY,
  CREATE_GAME,
  FETCH_TEAM_REPLY
} from "./constants";
import { NEUTRAL_VALUE } from "../constants/game";

export const initialState = {
  game: {
    id: null,
    board: [],
    rows: null,
    cols: null,
    currentPlayer: null,
    selectedCube: null,
    player1: null,
    player2: null,
    winner: null,
    winningLine: []
  },
  movables: [],
  myTeam: NEUTRAL_VALUE,
  animated: {}
};

export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_GAME:
      return { ...state, game: action.payload };
    case UPDATE_GAME:
      return { ...state, game: action.payload };
    case FETCH_MOVABLES:
      return { ...state, movables: action.payload };
    case SELECT_CUBE_REPLY:
      const { game, destinations: movables } = action.payload;
      return { ...state, game, movables };
    case FETCH_TEAM_REPLY:
      const { team } = action.payload;
      return { ...state, myTeam: team };
    case "ANIMATED":
      const { animated } = action.payload;
      return { ...state, animated };
    default:
      return state;
  }
};
