require("dotenv").config();
const express = require("express");
const { initDatabase } = require("./db");
const routes = require("./routes");
const { createOra } = require("./utils/ora");
const { User, Task } = require("./db/models");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(routes);

const run = async () => {
  await initDatabase();

  if (process.env.VANISH_USERS === "true") {
    const ora = createOra({
      startText: "Vanishing all Users...",
      succeedText: "All Users vanished successfully!",
    });
    await User.deleteMany({});
    ora.succeed();
  }
  if (process.env.VANISH_TASKS === "true") {
    const ora = createOra({
      startText: "Vanishing all Tasks...",
      succeedText: "All Tasks vanished successfully!",
    });
    await Task.deleteMany({});
    ora.succeed();
  }

  await app.listen(port, () => {
    createOra({ succeedText: `Server is up on Port ${port}!` }).succeed();
  });
};

run();
