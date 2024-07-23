import express from "express";
import * as postController from "./post.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { addPostSchema, deletePostSchema, updatePostSchema } from "./post.validator.js";
const postRouter = express.Router();

postRouter
  .route("/")
  .post(protectRoutes,validation(addPostSchema), postController.addPost)
  .get(postController.getAllPosts);
postRouter
  .route("/getUserPosts")
  .get(protectRoutes, postController.getUserPosts);
postRouter
  .route("/:_id")
  .get(postController.getPostById)
  .put(protectRoutes, validation(updatePostSchema),postController.updatePost)
  .delete(protectRoutes, validation(deletePostSchema),postController.deletePost)
  .patch(protectRoutes,postController.addLikeToPost)
export default postRouter;
