import express from 'express';
import * as authController from './auth.controller.js'
import { validation } from '../../utils/middleware/validation.js';
import { signInSchema, signUpSchema } from './auth.validator.js';
const authRouter = express.Router();

authRouter.post("/signup",validation(signUpSchema),authController.signUp);
authRouter.post("/signin",validation(signInSchema),authController.signIn);

export default authRouter;