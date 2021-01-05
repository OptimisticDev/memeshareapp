import express from "express";
import {
  createPost,
  getAllPosts,
  getAllMyPosts,
  likeUnlikePost,
  createComment,
} from "../controllers/postControllers.js";
import checkAuthorization from "../middleware/checkAuthorization.js";

const router = express.Router();

router.route("/").post(checkAuthorization, createPost);
router.route("/").get(checkAuthorization, getAllPosts);
router.route("/mypost").get(checkAuthorization, getAllMyPosts);
router.route("/likeunlike").put(checkAuthorization, likeUnlikePost);
router.route("/comment").put(checkAuthorization, createComment);

export default router;
