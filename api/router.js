const getGame = require("./app/getGame");
const createNewGame = require("./app/createNewGame");
const selectCube = require("./app/selectCube");
const playMove = require("./app/playMove");
const getMovables = require("./app/getMovables");
const getDestinations = require("./app/getDestinations");
const assignTeam = require("./app/assignTeam");
const createNewGameVsAi = require("./app/createNewGameVsAi");
const getLeaderboard = require("./app/getLeaderboard");
const signup = require("./app/signup");
const getPlayer = require("./app/getPlayer");
const getCurrentGamesForPlayer = require("./app/getCurrentGamesForPlayer");
const createNewGameWithFriends = require("./app/createNewGameWithFriends");

const listen = app => {
  app.get("/", (req, res) => res.send("Hello :)"));

  app.get("/new-game", async (req, res) => {
    const newGame = await createNewGame();
    res.send(newGame);
  });

  app.get("/new-game-ai", async (req, res) => {
    const newGame = await createNewGameVsAi();
    res.send(newGame);
  });

  app.get("/get-game/:id", async (req, res) => {
    const { id } = req.params;
    const game = await getGame(id);
    res.send(game);
  });

  app.get("/movables/:id", async (req, res) => {
    const { id } = req.params;
    const movables = await getMovables(id);
    res.send(movables);
  });

  app.post("/select-cube", async (req, res) => {
    const { id, ...selectedCube } = req.body;
    const newGame = await selectCube(id, selectedCube);
    const destinations = await getDestinations(id);
    res.send({ game: newGame, destinations });
  });

  app.post("/move-cube", async (req, res) => {
    const { id, ...destination } = req.body;
    const newGame = await playMove(id, destination);
    res.send(newGame);
  });

  app.get("/assign-me-team/:id/:pseudo", async (req, res) => {
    const { id, pseudo } = req.params;
    const team = await assignTeam(id, pseudo);
    res.send(team);
  });

  app.get("/get-leaderboard", async (req, res) => {
    const leaderboard = await getLeaderboard();
    res.send(leaderboard);
  });

  app.post("/signup", async (req, res) => {
    const { pseudo } = req.body;
    const newPlayer = await signup(pseudo);
    res.send(newPlayer);
  });

  app.get("/get-player/:pseudo", async (req, res) => {
    const { pseudo } = req.params;
    const player = await getPlayer(pseudo);
    res.send(player);
  });

  app.get("/get-games/:pseudo", async (req, res) => {
    const { pseudo } = req.params;
    const games = await getCurrentGamesForPlayer(pseudo);
    res.send(games);
  });

  app.post("/create-game-friends", async (req, res) => {
    const { pseudo1, pseudo2 } = req.body;
    const game = await createNewGameWithFriends(pseudo1, pseudo2);

    res.send(game);
  });
};

module.exports = listen;
