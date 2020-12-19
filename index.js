require("dotenv").config();
const express = require("express");
const { initDatabase } = require("./db");
const routeHandlers = require("./routeHandlers");
const { createOra } = require("./utils/ora");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", routeHandlers.users.addUserHandler);
app.get("/users", routeHandlers.users.fetchAllUsersHandler);
app.get("/users/:id", routeHandlers.users.fetchUserByIdHandler);
app.patch("/users/:id", routeHandlers.users.updateUserByIdHandler);
app.delete("/users/:id", routeHandlers.users.deleteUserByIdHandler);

app.post("/tasks", routeHandlers.tasks.addTaskHandler);
app.get("/tasks", routeHandlers.tasks.fetchAllTasksHandler);
app.get("/tasks/:id", routeHandlers.tasks.fetchTaskByIdHandler);
app.patch("/tasks/:id", routeHandlers.tasks.updateTaskByIdHandler);
app.delete("/tasks/:id", routeHandlers.tasks.deleteTaskByIdHandler);

const run = async () => {
  await initDatabase();

  app.listen(port, () => {
    createOra({ succeedText: `Server is up on Port ${port}!` }).succeed();
  });
};

run();
