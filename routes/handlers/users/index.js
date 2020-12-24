const { dbHelpers } = require("../../../db");

const { User } = dbHelpers;

const addUserHandler = async (req, res) => {
  const creationRes = await User.create(req.body);
  if (creationRes.errors) {
    return res.status(400).json({ error: true, message: creationRes.message });
  } else {
    return res.status(201).json(creationRes);
  }
};

const fetchAllUsersHandler = async (req, res) => {
  const fetchingRes = await User.fetchAll();
  if (fetchingRes.errors) {
    return res.status(500).json({ error: true, message: fetchingRes.message });
  } else {
    return res.json(fetchingRes);
  }
};

const fetchUserByIdHandler = async (req, res) => {
  const fetchingRes = await User.fetchById(req.params.id);
  if (fetchingRes.errors) {
    return res.status(400).json({ error: true, message: fetchingRes.message });
  } else {
    return res.json(fetchingRes);
  }
};

const updateUserByIdHandler = async (req, res) => {
  const updateRes = await User.updateById(req.params.id, req.body);
  if (updateRes.errors) {
    return res.status(400).json({ error: true, message: updateRes.message });
  } else {
    return res.json(updateRes);
  }
};

const deleteUserByIdHandler = async (req, res) => {
  const deleteRes = await User.deleteById(req.params.id);
  if (deleteRes.errors) {
    return res.status(400).json({ error: true, message: deleteRes.message });
  } else {
    return res.json(deleteRes);
  }
};

const signInUserHandler = async (req, res) => {
  const { email, password } = req.body;
  const signInRes = await User.signIn({ email, password });
  if (signInRes instanceof Error) {
    return res.status(400).json({ error: true, message: signInRes.message });
  } else {
    return res.json(signInRes);
  }
};

module.exports = {
  addUserHandler,
  fetchAllUsersHandler,
  fetchUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
  signInUserHandler,
};
