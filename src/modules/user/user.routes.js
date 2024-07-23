import express from 'express';
import * as userController from './user.controller.js'
import { protectRoutes } from '../auth/auth.controller.js';
import { validation } from '../../utils/middleware/validation.js';
import { changePasswordSchema, updateUserSchema } from './user.validator.js';

const userRouter = express.Router();
userRouter.route("/").get(userController.getAllUser)
userRouter.route("/:_id").put(validation(updateUserSchema),userController.updateUser);
userRouter.patch("/changepassword/:_id",validation(changePasswordSchema) ,userController.changePassword);
userRouter.patch("/logout", protectRoutes,userController.logOut);


export default userRouter;

