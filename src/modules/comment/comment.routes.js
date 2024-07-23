import express from "express";
import * as commentController from "./comment.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { addCommentSchema, deleteCommentSchema, updateCommentSchema } from "./comment.validator.js";
const commentRouter = express.Router();

commentRouter
  .route("/")
  .post(protectRoutes,validation(addCommentSchema),commentController.addComment)
  .get(commentController.getAllComment);

commentRouter
  .route("/:_id")
  .put(protectRoutes,validation(updateCommentSchema),commentController.updateComment)
  .delete(protectRoutes, validation(deleteCommentSchema),commentController.deleteComment)
  .patch(protectRoutes,commentController.addLikeToComment)
export default commentRouter;
