import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connection from "../config/db.js";

export async function signUp(req, res) {
    const {email, password, username, picture} = req.body;
    const hash = await bcrypt.hash(password, 10);
    
    try {
        const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows[0]) return res.status(409).send({error: "Email já cadastrado"});

        await connection.query('INSERT INTO users(email, password, name, avatar) VALUES ($1, $2, $3, $4)', [email, hash, username, picture]);
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const {email, password} = req.body;

    try {
        const user = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if (!user.rows[0] || !isValid) return res.status(401).send({error: "E-mail ou senha incorretos"});
        
        const data = {userId: user.rows[0].id, name: user.rows[0].name};
        const token = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "1d"});
        
        await connection.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', [token, user.rows[0].id]);
        return res.status(200).send({avatar: user.rows[0].avatar, token});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}