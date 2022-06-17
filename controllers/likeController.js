import connection from "../config/db.js";

export async function getUserLikes(req, res) {
    const { publicationId } = req.body;
    const userId = 1; //userId vai ser passado pelo res.locals no middleware de validação do token
    let findUser = null;

    try { 
        const { rows } = await connection.query(`
        SELECT users.name, likes."userId" 
        FROM likes 
        JOIN users ON likes."userId" = users.id
        WHERE "publicationId" = $1`, [publicationId]);

        const allLikes = rows.map((row) => {
            if (row.userId === userId) findUser = row.name;
            
            if (row.userId !== userId) {
                return row.name;
            }
        });

        res.send({userName: findUser, allLikes});
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export async function postLike(req, res) {
    const { publicationId } = req.body;
    const userId = 1; //userId vai ser passado pelo res.locals no middleware de validação do token

    try {
        const { rows } = await connection.query('SELECT * FROM likes WHERE "userId" = $1 AND "publicationId" = $2', [userId, publicationId]);
        
        if (rows.length === 0) {
            await connection.query('INSERT INTO likes ("userId", "publicationId") VALUES ($1, $2)', [userId, publicationId]);
            return res.send("likeSuccess");
        } else {
            await connection.query('DELETE FROM likes WHERE "userId" = $1 and "publicationId" = $2', [userId, publicationId]);
            return res.send("deslikeSuccess");
        }

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}