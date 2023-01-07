const taskService = require("../services/taskService");

const createNewTask = async function (req, res) {
  try {
    const { body, user } = req;

    if (!body || !body.type || !checkTaskType(body.type))
      throw { status: 400, message: "Invalid request. Missing parameters." };

    const task = { ...body, createdBy: user.id };

    const newTask = await taskService.createNewTask(task);

    res.status(201).json({
      status: "success",
      data: { task: newTask },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      status: "error",
      data: { error: error.message || "Internal Server Error." },
    });
  }
};

const getAllTasks = async function (req, res) {
  try {
    const { user } = req;

    const tasks = await taskService.getAllTasks({
      user: user,
    });

    res.status(200).json({
      status: "success",
      data: { tasks: tasks },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      status: "error",
      data: { error: error.message || "Internal Server Error." },
    });
  }
};

const getOneTask = async function (req, res) {
  try {
    const { id } = req.params;

    const { user } = req;

    if (!id) throw { status: 400, message: "Invalid request." };

    const task = await taskService.getOneTask(id, user);

    res.status(200).json({
      status: "success",
      data: { task: task },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      status: "error",
      data: { error: error.message || "Internal Server Error." },
    });
  }
};

const deleteOneTask = async function (req, res) {
  try {
    const { id } = req.params;

    const { user } = req;

    await taskService.deleteOneTask(id, user);

    res.status(204).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(error.status || 500).send({
      status: "error",
      data: { error: error.message || "Internal Server Error." },
    });
  }
};

const checkTaskType = function (type) {
  return (
    type === "do" ||
    type === "decide" ||
    type === "delegate" ||
    type === "delete"
  );
};

module.exports = {
  createNewTask,
  getAllTasks,
  getOneTask,
  deleteOneTask,
};
