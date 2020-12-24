require("dotenv").config();
const mongoose = require("mongoose");
const { execPromiseWithOra } = require("../utils/ora");

const dbModels = require("./models");
const dbHelpers = require("./helpers");

const CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const initDatabase = async () => {
  return execPromiseWithOra(
    () =>
      mongoose.connect(encodeURI(process.env.MONGODB_URI), CONNECTION_OPTIONS),
    {
      startText: "Initializing database...",
      succeedText: "Database initialized successfully!",
      failText: "Database initialization failed",
    }
  );
};

module.exports = { initDatabase, dbModels, dbHelpers };
