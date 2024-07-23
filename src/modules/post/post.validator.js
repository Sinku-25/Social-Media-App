import joi from "joi";

export const addPostSchema = joi.object({
  title: joi.string().min(5).max(50).required(),
  text: joi.string().min(5).max(100).required(),
  option: joi.string().valid("public", "private"),
});

export const updatePostSchema = joi.object({
  title: joi.string().min(5).max(50).required(),
  text: joi.string().min(5).max(100).required(),
  _id: joi.string().hex().length(24).required(),
  option: joi.string().valid("public", "private"),
});

export const deletePostSchema = joi.object({
  _id: joi.string().hex().length(24).required(),
});
