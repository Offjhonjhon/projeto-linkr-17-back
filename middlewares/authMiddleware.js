import {userSchema} from "../schemas/userSchema.js";

import jwt from 'jsonwebtoken';


export function validateUser(req, res, next) {
    const user = req.body;
    const {error} = userSchema.validate(user);

    if (error) return res.status(422).send(error.details.map((d) => d.message));

    next();

}

export async function verifyToken(req, res, next) {
    try {

        /* IS THERE TOKEN? */

        const { authorization } = req.headers

        if (!authorization) {
            console.log(`verifyToken/IS THERE TOKEN?`);
            res.sendStatus(401);
            return;
        }

        const token = authorization.replace('Bearer ', '');
        
        if (!token) {
            console.log(`verifyToken/IS THERE TOKEN?`);
            res.sendStatus(401);
            return;
        }

        
        /* JWT VERIFY */

        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
                console.log(`verifyToken/JWT VERIFY - ${err}`);
                res.sendStatus(401);
                return;
            }

            
            res.locals.userId = decoded.userId;
            next();
        });
        

    } catch (error) {
        console.log(`verifyToken - ${error}`);
        res.sendStatus(500);
    }
}