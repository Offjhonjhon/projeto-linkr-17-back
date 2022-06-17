import {userSchema} from "../schemas/userSchema.js";

export function validateUser(req, res, next) {
    const user = req.body;
    const {error} = userSchema.validate(user);

    if (error) return res.status(422).send(error.details.map((d) => d.message));

    next();
}