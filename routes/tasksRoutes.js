import express from "express";
import tasksController from "../controllers/tasksController.js";

const router = express.Router();

router.post("/", tasksController.createTask);
router.get("/", tasksController.getTasks);
router.get("/:id", tasksController.getTask);
router.put("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

export default router;
