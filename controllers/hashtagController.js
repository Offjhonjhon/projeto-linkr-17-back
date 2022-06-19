import connection from "../config/db.js";

export async function getTrendingHashtags(req, res) {

    try {
        const hashtags = await connection.query(`SELECT * FROM tags ORDER BY id DESC LIMIT 10 `);
        res.status(200).send(hashtags.rows);
    }
    catch {
        res.status(500).send("Error getting hashtags");
    }
}

export async function getHashtagPosts(req, res) {

    try {
        const posts = await connection.query(`
            SELECT publications.* FROM publications
            JOIN "publicationsTags" 
            ON publications.id = "publicationsTags"."publicationId" 
            JOIN tags 
            ON "publicationsTags"."tagId" = tags.id
            WHERE tags.tag = $1
        `, [req.params.tag]);

        res.status(200).send(posts.rows);
    }
    catch {
        res.status(500).send("Error getting posts");
    }
}