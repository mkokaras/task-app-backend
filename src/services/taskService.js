const Task = require("../models/Task");

const createNewTask = async function (task) {
  try {
    const newTask = await Task.createNewTask(task);

    return newTask;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async function (filterParams) {
  try {
    const tasks = await Task.getAllTasks(filterParams);

    return tasks;
  } catch (error) {
    throw error;
  }
};
const getOneTask = async function (id, user) {
  try {
    const task = await Task.getOneTask(id, user);

    return task;
  } catch (error) {
    throw error;
  }
};

const deleteOneTask = async function (id, user) {
  try {
    await Task.deleteOneTask(id, user);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewTask,
  getAllTasks,
  getOneTask,
  deleteOneTask,
};
