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
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {

    res.sendStatus(501);
}