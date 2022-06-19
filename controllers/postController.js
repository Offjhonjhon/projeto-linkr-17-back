import connection from "../config/db.js";

export async function editPost(req, res) {
    const { publicationId, description } = req.body;
    const userId = 1;

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

export async function deletePost(req, res) {
    const { postId } = req.params;
    const userId = 1;

    console.log(postId)
    try {
        await connection.query('DELETE FROM likes WHERE "publicationId" = $1', [postId]);
        await connection.query('DELETE FROM publications WHERE "id" = $1 AND "userId" = $2', [postId, userId]);
        res.sendStatus(200);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}