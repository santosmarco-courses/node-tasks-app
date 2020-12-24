const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  encryptPassword: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.encryptPassword) {
    const encryptedPassword = await bcrypt.hash(user.password, 8);
    user.password = encryptedPassword;
    user.encryptPassword = false;
  }

  next();
});

userSchema.statics.findByCredentials = async ({ email, password }) => {
  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    throw new Error(
      "Something went wrong when trying to find User by the provided credentials."
    );
  }

  const isMatch = await bcrypt.compare(password, userDoc.password);

  if (!isMatch) {
    throw new Error(
      "Something went wrong when trying to find User by the provided credentials."
    );
  }

  return userDoc;
};

const User = mongoose.model("courses-node-task-app-users", userSchema);

module.exports = User;
