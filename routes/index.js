const express = require("express");
const tasksHandlers = require("./handlers/tasks");
const usersHandlers = require("./handlers/users");

const router = new express.Router();

router.post("/users", usersHandlers.addUserHandler);
router.get("/users", usersHandlers.fetchAllUsersHandler);
router.get("/users/:id", usersHandlers.fetchUserByIdHandler);
router.patch("/users/:id", usersHandlers.updateUserByIdHandler);
router.delete("/users/:id", usersHandlers.deleteUserByIdHandler);

router.post("/tasks", tasksHandlers.addTaskHandler);
router.get("/tasks", tasksHandlers.fetchAllTasksHandler);
router.get("/tasks/:id", tasksHandlers.fetchTaskByIdHandler);
router.patch("/tasks/:id", tasksHandlers.updateTaskByIdHandler);
router.delete("/tasks/:id", tasksHandlers.deleteTaskByIdHandler);

router.post("/auth/login", usersHandlers.signInUserHandler);

module.exports = router;
