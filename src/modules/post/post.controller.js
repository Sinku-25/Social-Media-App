import postModel from "../../../DB/models/post.model.js";
import userModel from "../../../DB/models/user.model.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";

export const addPost = catchAsyncError(async (req, res, next) => {
  let IsUserExist = await userModel.findOne({ _id: req.user._id });
  req.body.user = req.user._id;
  if (IsUserExist) {
    let post = new postModel(req.body);
    await post.save();
    res.json({ message: "post added successfully", post });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export const getAllPosts = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(postModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let post = await apiFeature.mongooseQuery;
  res.json({ message: "Founded", post });
});

export const getUserPosts = catchAsyncError(async (req, res, next) => {
  let userExist = await userModel.findOne({ _id: req.user._id });
  if (userExist) {
    let post = await postModel.find({ user: req.user._id });
    res.json({ message: "user posts founded", post });
  } else {
    res.json({ message: "user not found" });
  }
});

export const getPostById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let post = await postModel.findById(_id);
  post && res.json({ message: "post founded", post });
  !post && next(new AppError("post not found", 401));
});
export const updatePost = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let post = await postModel.findByIdAndUpdate(_id, req.body, { new: true });
  post && res.json({ message: "post updated", post });
  !post && next(new AppError("post not updated", 401));
});
export const deletePost = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let post = await postModel.findByIdAndDelete(_id);
  post && res.json({ message: "post deleted", post });
  !post && next(new AppError("post not founded", 404));
});


export const addLikeToPost = catchAsyncError(async (req, res, next) => {
  const { _id } = req.params;
  const post = await postModel.findByIdAndUpdate(_id, { new: true });

  if (!post) {
    return next(new AppError("post not found", 404));
  }

  const isLiked = post.like.includes(req.user._id);

  if (isLiked) {
    post.like.pull(req.user._id);
  } else {
    post.like.push(req.user._id);
  }
  post.Likes = post.like.length;
  await post.save();

  const message = isLiked ? "unliked" : "liked";
  res.status(200).json({ message });
});

