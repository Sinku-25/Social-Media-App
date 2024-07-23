import userModel from "../../../DB/models/user.model.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";

export const getAllUser = catchAsyncError(async (req,res,next)=>{
    let apiFeature = new ApiFeatures(userModel.find(),req.query).pagination().filter().sort().search().fields();
    let user  = await apiFeature.mongooseQuery;
    res.json({message:"Founded",user})
})

export const updateUser = catchAsyncError(async (req, res, next) => {
    let { _id } = req.params;
    let user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
    !user && next(new AppError("not found user", 404));
    user && res.json({ message: "done", user });
  });


export const changePassword = catchAsyncError(async (req, res, next) => {
    let { _id } = req.params;
   req.body.changePasswordAt = Date.now();
    let user = await userModel.findOneAndUpdate({_id}, req.body, { new: true });
    !user && next(new AppError("not found user", 404));
    user && res.json({ message: "done", user });
  });
  
export const logOut = catchAsyncError(async(req,res,next)=>{
    let user  = await userModel.findOneAndUpdate({_id:req.user._id},{isOnline:false},{new:true})
    user && res.json({message:"user logout successfully",user})
    !user && next(new AppError("user not found to logout"))
})