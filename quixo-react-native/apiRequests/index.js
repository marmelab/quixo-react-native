import { API_HOST } from "../constants/api";

export const getNewGame = async () => {
  const response = await fetch(`${API_HOST}/new-game`);
  return await response.json();
};
