import connection from "../config/db.js";

export async function getAllReposts(req, res) {
    const {publicationId} = req.body;
    const {userId} = reqres.locals;

    try {
        res.sendStatus(501);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function postRepost(req, res) {
    const {publicationId} = req.body;
    const {userId} = res.locals;

    try {
        await connection.query('INSERT INTO reposts ("userId", "publicationId") VALUES ($1, $2)', [userId, publicationId]);
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}