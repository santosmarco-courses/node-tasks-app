const chalk = require("chalk");
const { User } = require("../models");
const { execPromiseWithOra } = require("../../utils/ora");

const create = (userData) => {
  return execPromiseWithOra(() => User.create(userData), {
    startText: `Creating user: ${userData?.name}...`,
    succeedText: (res) => `User "${res.name}" created successfully:`,
    failText: (err) =>
      `Unable to create user: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

const fetchAll = () => {
  return execPromiseWithOra(() => User.find({}), {
    startText: "Fetching all users...",
    succeedText: (res) => `Users fetched successfully! (Total: ${res.length})`,
    failText: (err) =>
      `Unable to fetch users: ${chalk.reset.red.italic(err.message)}`,
  });
};

const fetchById = (userId) => {
  return execPromiseWithOra(() => User.findById(userId), {
    startText: `Fetching user: ${userId}...`,
    succeedText: (res) => `User "${res.name}" fetched successfully:`,
    failText: (err) =>
      `Unable to fetch user: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

const updateById = (userId, updateObj) => {
  return execPromiseWithOra(
    async () => {
      const userDoc = await User.findById(userId);
      Object.entries(updateObj).forEach(([key, val]) => {
        if (key === "password") {
          userDoc.encryptPassword = true;
        }
        userDoc[key] = val;
      });
      await userDoc.save();

      return User.findById(userId);
    },
    {
      startText: `Updating user: ${userId}...`,
      succeedText: (res) => `User "${res.name}" updated successfully:`,
      failText: (err) =>
        `Unable to update user: ${chalk.reset.red.italic(err.message)}`,
      onSucceed: (res) => console.log(res),
    }
  );
};

const deleteById = (userId) => {
  return execPromiseWithOra(() => User.findByIdAndDelete(userId), {
    startText: `Deleting user: ${userId}...`,
    succeedText: (res) => `User "${res.name}" deleted successfully:`,
    failText: (err) =>
      `Unable to delete user: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

const signIn = ({ email, password }) => {
  return execPromiseWithOra(() => User.findByCredentials({ email, password }), {
    startText: `Signing in user: ${email}...`,
    succeedText: (res) => `User "${res.email}" signed in successfully:`,
    failText: (err) =>
      `Unable to sign in user: ${chalk.reset.red.italic(err.message)}`,
    onSucceed: (res) => console.log(res),
  });
};

module.exports = {
  instance: User,
  create,
  fetchAll,
  fetchById,
  updateById,
  deleteById,
  signIn,
};
