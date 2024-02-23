import { Router } from "express";
import {  userRegistration ,updateProfile ,getAllUsers ,deleteUser,getCounts} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(userRegistration);
router.route("/updateprofile/:id").put(updateProfile);
router.route("/allusers").get(getAllUsers)
router.route("/delete/:id").delete(deleteUser)
router.route("/getcounts").get(getCounts)

export default router