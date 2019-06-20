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

  app.get("/movables", async (req, res) => {
    const id = req.param("id");
    const movables = await getMovables(id);
    res.send(movables);
  });

  app.post("/select-cube", async (req, res) => {
    const id = req.body.id;
    const selectedCube = { x: req.body.x, y: req.body.y };
    const newGame = await selectCube(id, selectedCube);
    const destinations = await getDestinations(id);
    res.send({ game: newGame, destinations });
  });

  app.post("/move-cube", async (req, res) => {
    const id = req.body.id;
    const destination = { x: req.body.x, y: req.body.y };
    const newGame = await moveCube(id, destination);
    res.send(newGame);
  });
};

module.exports = listen;
