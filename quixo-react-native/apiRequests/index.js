import { API_HOST } from "../constants/api";

const postOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

export const getNewGame = async () => {
  const response = await fetch(`${API_HOST}/new-game`);
  return await response.json();
};

export const getExistingGame = async id => {
  const response = await fetch(`${API_HOST}/get-game/${id}`);
  return await response.json();
};

export const getMovables = async id => {
  const response = await fetch(`${API_HOST}/movables/${id}`);
  return await response.json();
};

export const postSelectCube = async ({ id, x, y }) => {
  const response = await fetch(`${API_HOST}/select-cube`, {
    ...postOptions,
    body: JSON.stringify({ id, x, y })
  });
  return await response.json();
};

export const postMoveCube = async ({ id, x, y }) => {
  const response = await fetch(`${API_HOST}/move-cube`, {
    ...postOptions,
    body: JSON.stringify({ id, x, y })
  });
  return await response.json();
};

export const getMyTeam = async id => {
  const response = await fetch(`${API_HOST}/assign-me-team/${id}`);
  return await response.json();
};

export const getNewGameVsAi = async () => {
  const response = await fetch(`${API_HOST}/new-game-ai`);
  return await response.json();
};
