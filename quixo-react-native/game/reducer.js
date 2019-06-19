import { UPDATE_GAME } from "./constants";

export const initialState = {
  id: null,
  board: [],
  rows: null,
  cols: null,
  winner: null,
  currentPlayer: null,
  selectedCube: null,
  player1: null,
  player2: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
