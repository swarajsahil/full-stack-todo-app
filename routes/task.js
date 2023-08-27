import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { authenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/new",authenticated,newTask);
router.get("/my",authenticated,getMyTask);
router.route("/:id").put(authenticated,updateTask).delete(authenticated,deleteTask);
export default router;