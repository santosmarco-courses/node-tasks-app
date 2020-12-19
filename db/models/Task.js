const mongoose = require("mongoose");

const Task = mongoose.model("courses-node-task-app-tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
