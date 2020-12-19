const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("courses-node-task-app-users", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid e-mail.");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (validator.contains(value, "password", { ignoreCase: true })) {
        throw new Error(`Password must not contain the string "password".`);
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be greater than or equal to zero.");
      }
    },
  },
});

module.exports = User;
