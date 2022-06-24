import connection from "../config/db.js";

export async function getAllReposts(req, res) {
    const {id} = req.params;

    try {
        const {rows} = await connection.query('SELECT * FROM reposts WHERE "publicationId" = $1', [id]);
        res.status(200).send({publications: rows, count: rows.length});
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