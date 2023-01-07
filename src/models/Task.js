const Task = require("../schemas/taskSchema");

const createNewTask = async function (newTask) {
  try {
    const task = new Task(newTask);

    const savedTask = await task.save();

    return await savedTask.populate("createdBy", "-password");
  } catch (error) {
    throw error;
  }
};

const getOneTask = async function (id, user) {
  try {
    const task = await Task.findOne({
      _id: id,
      createdBy: user.id,
    }).populate("createdBy", "-password");

    if (!task) throw { status: 404, message: "Task doesnt exist." };

    return task;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async function (filterParams) {
  try {
    const { user } = filterParams;

    if (!user) return;

    const tasks = await Task.find({ createdBy: user.id });

    return tasks;
  } catch (error) {
    throw error;
  }
};

const deleteOneTask = async function (id, user) {
  try {
    const task = await Task.findById(id);

    if (user.id !== task.createdBy.toString())
      throw { status: 403, message: "Forbidden action." };

    if (!task) throw { status: 404, message: "Task doesnt exist." };

    await task.delete();
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
