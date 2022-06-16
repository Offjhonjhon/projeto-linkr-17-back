import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    picture: joi.string().uri().required()
});