import connection from "../config/db.js";


export async function getCommentsQuantity(req, res) {
    const { id } = req.params;
    try {
        const numberOfComments = await connection.query(`
            SELECT COUNT(id) FROM comments 
            WHERE "publicationId" = ($1)
            ;
        `, [id]);

        res.status(200).send(numberOfComments.rows[0].count);
    }
    catch (error) {
        res.sendStatus(500).send(error)
    }
}

export async function getComments(req, res) {
    const { id } = req.params;
    try {
        const comments = await connection.query(`
        SELECT comments.*, u.name, u.avatar FROM comments
        JOIN users u ON u.id = comments."userId"
        WHERE "publicationId" = ($1)
        ORDER BY comments.id DESC
            ;
        `, [id]);

        res.status(200).send(comments.rows);
    }
    catch (error) {
        res.status(500).send(error)
    }
}

export async function postComment(req, res) {
    const { postId, comment } = req.body;
    const { userId } = res.locals;

    try {
        await connection.query(`
        INSERT INTO comments ("comment", "userId", "publicationId")
        VALUES ($1,$2,$3)
        ;`, [comment, userId, postId]);

        res.status(200);
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500).send(error);
    }
}
