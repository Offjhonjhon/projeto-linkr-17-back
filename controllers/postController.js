import connection from "../config/db.js";

export async function editPost(req, res) {
    const { publicationId, description } = req.body;
    const userId = 2;

    try {
        await connection.query(`UPDATE publications 
                                SET text= $1
                                WHERE id = $2 AND "userId" = $3`,
                                [description, publicationId, userId]);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}