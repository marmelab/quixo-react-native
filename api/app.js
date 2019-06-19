const express = require("express");
const app = express();
const { PORT } = require("./constants/api");
const createNewGame = require("./app/createNewGame");

app.get("/", (req, res) => res.send("Hello :)"));
app.get("/new-game", async (req, res) => {
  const newGame = await createNewGame();
  res.send(newGame);
});

app.listen(PORT, () => console.log(`App listnen on ${PORT}`));
