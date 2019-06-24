const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./constants/api");
const router = require("./router");

const app = express();
app.use(bodyParser.json());

router(app);

app.listen(PORT, () => console.log(`App listen on ${PORT}`));
