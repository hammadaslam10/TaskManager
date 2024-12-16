const express = require("express");
const { CreateTask, UpdateTask, DeleteTask, GetTask,GetSingleTask } = require("../controllers/taskcontroller")
const router = express.Router();
router.route("/tasks").get(GetTask)
router.route("/tasks").post(CreateTask)
router.route("/tasks/:id").put(UpdateTask)
router.route("/tasks/:id").get(GetSingleTask)
router.route("/tasks/:id").delete(DeleteTask)
module.exports = router;