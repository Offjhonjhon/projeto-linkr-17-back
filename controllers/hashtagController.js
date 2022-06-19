import connection from "../config/db.js";

export async function getTrendingHashtags(req, res) {

    try {
        const trendingHashtags = await connection.query(`
            SELECT tags.tag, COUNT(pt.tag) as "postsCount" FROM tags
            JOIN "publicationsTags" pt ON pt.tag = tags.tag
            GROUP BY tags.tag
            ORDER BY "postsCount" DESC
            LIMIT 10
        `);
        res.status(200).send(trendingHashtags.rows);
    }
    catch {
        res.status(500).send("Error getting hashtags");
    }
}

export async function getHashtagPosts(req, res) {

    try {
        const posts = await connection.query(`
            SELECT publications.* FROM "publicationsTags"
            JOIN publications ON publications."publicationcode" = "publicationsTags"."publicationCode"
            JOIN tags ON tags.tag = "publicationsTags".tag
            WHERE tags.tag = $1
        `, [req.params.tag]);

        res.status(200).send(posts.rows);
    }
    catch {
        res.status(500).send("Error getting posts");
    }
}