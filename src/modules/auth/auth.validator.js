import joi from "joi";

export const signUpSchema = joi.object({
  firstName: joi.string().min(2).max(20).required(),
  lastName: joi.string().min(2).max(20).required(),
  userName: joi.string().min(2).max(40).required(),
  email:joi.string().email({tlds:{allow:['com','net']}}).required(),
  password:joi.string().pattern(/^[A-Z][a-z]{3,8}$/).required(),
});

export const signInSchema = joi.object({
    email:joi.string().email({tlds:{allow:['com','net']}}).required(),
    password:joi.string().pattern(/^[A-Z][a-z]{3,8}$/).required(),
});
