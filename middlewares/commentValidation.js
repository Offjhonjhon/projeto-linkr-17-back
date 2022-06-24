import commentSchema from "../schemas/commentSquema.js";

export function validateComment(req, res, next) {
    const { body } = req;
    const { error } = commentSchema.validate(req);

    if (error) return res.status(422).send(error.details.map((d) => d.message));

    next();
}