import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js"
// import { deleteUser, getMyProfile, getUser, login, logout, postUser, register, updateUser, updateUserSomeDetail } from "../controllers/user.js"
import { authenticated } from "../middlewares/auth.js";

const router=express.Router();
// router.route("/").get(getUser).post(postUser);
// router.route("/:id").put(updateUser).patch(updateUserSomeDetail).delete(deleteUser);
router.post("/register",register);
router.post("/login",login);
router.get("/getdata",authenticated,getMyProfile);
router.get("/logout",logout);
export default router;