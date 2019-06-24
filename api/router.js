const getGame = require("./app/getGame");
const createNewGame = require("./app/createNewGame");
const selectCube = require("./app/selectCube");
const playMove = require("./app/playMove");
const getMovables = require("./app/getMovables");
const getDestinations = require("./app/getDestinations");
const assignTeam = require("./app/assignTeam");
const createNewGameVsAi = require("./app/createNewGameVsAi");

const listen = async app => {
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

  app.get("/assign-me-team/:id", async (req, res) => {
    const { id } = req.params;
    const team = await assignTeam(id);
    res.send(team);
  });
};

module.exports = listen;
