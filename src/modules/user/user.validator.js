import joi from "joi";

export const updateUserSchema = joi.object({
  firstName: joi.string().min(2).max(20).required(),
  lastName: joi.string().min(2).max(20).required(),
  _id:joi.string().hex().length(24).required(),
});

export const changePasswordSchema = joi.object({
  _id:joi.string().hex().length(24).required(),
  password:joi.string().pattern(/^[A-Z][a-z]{3,8}$/).required(),
});
