import joi from "joi";

export const likeSchema = joi.object({
    publicationId: joi.number().integer().required()
});