import joi from "joi";

export const addCommentSchema = joi.object({
  text: joi.string().min(5).max(100).required(),
  post: joi.string().hex().length(24).required(),

});

export const updateCommentSchema = joi.object({
  text: joi.string().min(5).max(100).required(),
  post: joi.string().hex().length(24).required(),
  _id: joi.string().hex().length(24).required(),

});

export const deleteCommentSchema = joi.object({
  post: joi.string().hex().length(24).required(),
  _id: joi.string().hex().length(24).required(),
});
