import AppError from "../../services/AppError.js";
import catchAsyncError from "../catchAsyncError.js";

const deleteOne = (model)=>{
  return  catchAsyncError(async (req, res, next) => {
        let { _id } = req.params;
        let category = await model.findByIdAndDelete(_id);
        !category && next(new AppError("not found category",404))
        category && res.json({ messsage: "done", category });
      });
}

export default deleteOne;