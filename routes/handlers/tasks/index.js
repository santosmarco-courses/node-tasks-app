const { dbHelpers } = require("../../../db");

const { Task } = dbHelpers;

const addTaskHandler = async (req, res) => {
  const creationRes = await Task.create(req.body);
  if (creationRes.errors) {
    return res.status(400).json({ error: true, message: creationRes.message });
  } else {
    return res.status(201).json(creationRes);
  }
};

const fetchAllTasksHandler = async (req, res) => {
  const fetchingRes = await Task.fetchAll();
  if (fetchingRes.errors) {
    return res.status(500).json({ error: true, message: fetchingRes.message });
  } else {
    return res.json(fetchingRes);
  }
};

const fetchTaskByIdHandler = async (req, res) => {
  const fetchingRes = await Task.fetchById(req.params.id);
  if (fetchingRes.errors) {
    return res.status(400).json({ error: true, message: fetchingRes.message });
  } else {
    return res.json(fetchingRes);
  }
};

const updateTaskByIdHandler = async (req, res) => {
  const updateRes = await Task.updateById(req.params.id, req.body);
  if (updateRes.errors) {
    return res.status(400).json({ error: true, message: updateRes.message });
  } else {
    return res.json(updateRes);
  }
};

const deleteTaskByIdHandler = async (req, res) => {
  const deleteRes = await Task.deleteById(req.params.id);
  if (deleteRes.errors) {
    return res.status(400).json({ error: true, message: deleteRes.message });
  } else {
    return res.json(deleteRes);
  }
};

module.exports = {
  addTaskHandler,
  fetchAllTasksHandler,
  fetchTaskByIdHandler,
  updateTaskByIdHandler,
  deleteTaskByIdHandler,
};
