import userModel from "../../../DB/models/user.model.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../../utils/services/AppError.js";

export const signUp = catchAsyncError(async (req, res, next) => {
  let isFound = await userModel.findOne({ email: req.body.email });
  if (isFound) next(new AppError("Email Already Exist", 409));
  let user = new userModel(req.body);
  await user.save();
  res.json({ message: "Successfully registered", user });
});

export const signIn = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;
  let isFound = await userModel.findOne({ email });
  const match = await bcrypt.compare(password, isFound.password);
  if (isFound && match) {
    let token = jwt.sign(
      { name: isFound.name, userId: isFound._id, role: isFound.role  },
      process.env.SECRET_KEY
    );
    let result =  await userModel.findOneAndUpdate(
      { _id: isFound._id },
      {
        isOnline: true,
      },
      { new: true }
    );
    return res.json({ message: "success login", token ,result });
  }
  next(new AppError("Incorrect email or pass", 401));
});



export const protectRoutes = catchAsyncError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("please provide token", 401));
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("Invalid user ", 404));
  if(user.changePasswordAt){
    let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
    if (changePasswordTime > decoded.iat) return next(new AppError("token invalid", 401));
  }
 req.user = user;
  next();
});





