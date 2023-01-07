const { Router } = require("express");
const router = Router();
const taskController = require("../controllers/taskController");
const { authenticationMiddleware } = require("../middleware/authMiddleware");

router.post("/", authenticationMiddleware, taskController.createNewTask);

router.get("/:id", authenticationMiddleware, taskController.getOneTask);

router.get("/", authenticationMiddleware, taskController.getAllTasks);

router.delete("/:id", authenticationMiddleware, taskController.deleteOneTask);

module.exports = router;
