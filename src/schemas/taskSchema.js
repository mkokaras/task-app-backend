const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, default: "" },
  type: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  endDate: Date,
  createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

// types: do, decide, delegate, delete

// task: done, date, text

module.exports = mongoose.model("Task", taskSchema);
