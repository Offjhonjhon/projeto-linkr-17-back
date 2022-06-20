import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.userData = data;
    } catch (e) {
        console.log(e)
        return res.status(401).send("Token inválido!");
    }

    next();
}