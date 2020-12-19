const chalk = require("chalk");
const { Task } = require("../models");
const { execPromiseWithOra } = require("../../utils/ora");

const create = (taskData) => {
  return execPromiseWithOra(() => Task.create(taskData), {
    startText: `Creating task: ${taskData?.description}...`,
    succeedText: (res) => `Task "${res.description}" created successfully:`,
    failText: (err) =>
      `Unable to create task: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

const fetchAll = () => {
  return execPromiseWithOra(() => Task.find({}), {
    startText: "Fetching all tasks...",
    succeedText: (res) => `Tasks fetched successfully! (Total: ${res.length})`,
    failText: (err) =>
      `Unable to fetch tasks: ${chalk.reset.red.italic(err.message)}`,
  });
};

const fetchById = (taskId) => {
  return execPromiseWithOra(() => Task.findById(taskId), {
    startText: `Fetching task: ${taskId}...`,
    succeedText: (res) => `Task "${res.description}" fetched successfully:`,
    failText: (err) =>
      `Unable to fetch task: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

const updateById = (taskId, updateObj) => {
  return execPromiseWithOra(
    async () => {
      await Task.findByIdAndUpdate(taskId, updateObj, { runValidators: true });
      return Task.findById(taskId);
    },
    {
      startText: `Updating task: ${taskId}...`,
      succeedText: (res) => `Task "${res.description}" updated successfully:`,
      failText: (err) =>
        `Unable to update task: ${chalk.reset.red.italic(err.message)}`,
      onSucceed: (res) => console.log(res),
    }
  );
};

const deleteById = (taskId) => {
  return execPromiseWithOra(() => Task.findByIdAndDelete(taskId), {
    startText: `Deleting task: ${taskId}...`,
    succeedText: (res) => `Task "${res.description}" deleted successfully:`,
    failText: (err) =>
      `Unable to delete task: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

module.exports = {
  instance: Task,
  create,
  fetchAll,
  fetchById,
  updateById,
  deleteById,
};
