import joi from "joi";

export const userSchema = joi.object({
    name: joi.number().integer().required()
});