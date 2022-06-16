import connection from "../config/db.js";

export async function getUserLikes(req, res) {
    const { publicationId } = req.body;
    const userId = 1; //userId vai ser passado pelo res.locals no middleware de validação o token

    try {        
        const userLikes = await connection.query('SELECT * FROM likes WHERE "userId" = $1 AND "publicationId" = $2', [userId, publicationId]);
        console.log(userLikes.rows[0])
        if (userLikes.rows[0]) {
            return res.send({isLiked: true});
        } else {
            return res.send({isLiked: false});
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function postLike(req, res) {
    const { publicationId } = req.body;
    const userId = 1; //userId vai ser passado pelo res.locals no middleware de validação o token

    try {
        const { rows } = await connection.query('SELECT * FROM likes WHERE "userId" = $1 AND "publicationId" = $2', [userId, publicationId]);
        
        if (rows.length === 0) {
            await connection.query('INSERT INTO likes ("userId", "publicationId") VALUES ($1, $2)', [userId, publicationId]);
            return res.send("likeSuccess")
        } else {
            await connection.query('DELETE FROM likes WHERE "userId" = $1 and "publicationId" = $2', [userId, publicationId]);
            return res.send("deslikeSuccess")
        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}