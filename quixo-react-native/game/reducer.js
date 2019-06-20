import { UPDATE_GAME, FETCH_MOVABLES, SELECT_CUBE_REPLY } from "./constants";

export const initialState = {
  game: {
    id: null,
    board: [],
    rows: null,
    cols: null,
    winner: null,
    currentPlayer: null,
    selectedCube: null,
    player1: null,
    player2: null
  },
  movables: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, game: action.payload };
    case FETCH_MOVABLES:
      return { ...state, movables: action.payload };
    case SELECT_CUBE_REPLY:
      const { game, destinations: movables } = action.payload;
      return { ...state, game, movables };
    default:
      return state;
  }
};
