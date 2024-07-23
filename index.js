import express from 'express';
import { connection } from './DB/dbConnection.js';
import * as dotenv from "dotenv";
import AppError from './src/utils/services/AppError.js';
import globalError from './src/utils/middleware/globalErrorHandle.js';
import userRouter from './src/modules/user/user.routes.js';
import authRouter from './src/modules/auth/auth.routes.js';
import postRouter from './src/modules/post/post.routes.js';
import commentRouter from './src/modules/comment/comment.routes.js';
const app = express();
const port = 3000;
app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user",userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
connection();

app.use("*", (req, res, next) => {
    next(new AppError(`can't find this route :${req.originalUrl}`, 404));
  });
  app.use(globalError);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))