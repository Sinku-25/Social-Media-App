import commentModel from "../../../DB/models/comment.model.js";
import postModel from "../../../DB/models/post.model.js";
import userModel from "../../../DB/models/user.model.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";

export const addComment = catchAsyncError(async (req, res, next) => {
  const IsUserExist = await userModel.findOne({ _id: req.user._id });
  const postExist = await postModel.findOne({ _id: req.body.post });

  if (IsUserExist && postExist) {
    req.body.user = req.user._id;
    const comment = new commentModel(req.body);
    await comment.save();

    res.json({ message: "Comment added successfully", comment });
  } else {
    next(new AppError("User or Post not found", 404));
  }
});

export const getAllComment = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(commentModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let comment = await apiFeature.mongooseQuery;
  res.json({ message: "Founded", comment });
});

export const updateComment = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let user = await userModel.findOne({ _id: req.user._id });
  if (!user)
    return next(new AppError("You are not authorize to update comment"));
  let commentExist = await commentModel.findById(_id);
  if (!commentExist) return next(new AppError("comment not found", 404));
  let comment = await commentModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  comment && res.json({ message: "comment updated", comment });
  !comment && next(new AppError("comment not updated", 401));
});

export const deleteComment = catchAsyncError(async (req, res, next) => {
    let { _id } = req.params;
    let user = await userModel.findOne({ _id: req.user._id });
    if (!user)
      return next(new AppError("You are not authorize to delete comment"));
    let commentExist = await commentModel.findById(_id);
    if (!commentExist) return next(new AppError("comment not found", 404));
    let comment = await commentModel.findByIdAndDelete(_id);
    comment && res.json({ message: "comment deleted", comment });
    !comment && next(new AppError("comment not delete", 401));
});

export const addLikeToComment = catchAsyncError(async (req, res, next) => {
    const { _id } = req.params;
    const comment = await commentModel.findByIdAndUpdate(_id, { new: true });
  
    if (!comment) {
      return next(new AppError("comment not found", 404));
    }
  
    const isLiked = comment.like.includes(req.user._id);
  
    if (isLiked) {
        comment.like.pull(req.user._id);
    } else {
        comment.like.push(req.user._id);
    }
    comment.Likes = comment.like.length;
    await comment.save();
  
    const message = isLiked ? "unliked" : "liked";
    res.status(200).json({ message });
  });
