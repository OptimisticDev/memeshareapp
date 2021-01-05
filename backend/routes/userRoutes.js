import express from "express";
import {
  signUpUser,
  signInUser,
  resetPassword,
  newPassword,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);
router.route("/reset-password").post(resetPassword);
router.route("/new-password").post(newPassword);

export default router;
