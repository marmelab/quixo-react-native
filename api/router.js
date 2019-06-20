const createNewGame = require("./app/createNewGame");
const selectCube = require("./app/selectCube");
const moveCube = require("./app/moveCube");
const getMovables = require("./app/getMovables");
const getDestinations = require("./app/getDestinations");

const listen = app => {
  app.get("/", (req, res) => res.send("Hello :)"));

  app.get("/new-game", async (req, res) => {
    const newGame = await createNewGame();
    res.send(newGame);
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
    const newGame = await moveCube(id, destination);
    res.send(newGame);
  });
};

module.exports = listen;
