import { likeSchema } from "../schemas/likeSchema.js";

export async function validateLikeData(req, res, next) {
    const { body } = req;
    const { error } = likeSchema.validate(body, {abortEarly: false});
    
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}