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
            SELECT u.avatar, u.name, p.text, p.link as url FROM "publicationsTags" pt
            JOIN publications p ON p."publicationCode" = pt."publicationCode"
            JOIN users u ON p."userId" = u.id
            JOIN tags ON tags.tag = pt.tag
            WHERE tags.tag = $1
        `, [req.params.tag]);

        res.status(200).send(posts.rows);
    }
    catch {
        res.status(500).send("Error getting posts");
    }
}

export async function postPublicationTag(req, res) {
    const { publicationCode, tag } = req.body;
    try {

        const { rows } = await connection.query(`
            SELECT * FROM tags WHERE tag = $1
        `, [tag]);

        if (rows.length === 0) {
            await connection.query(`
                INSERT INTO tags (tag) VALUES ($1)
            `, [tag]);
        }

        await connection.query(`
            INSERT INTO "publicationsTags" ("publicationCode", "tag") VALUES ($1, $2)
        `, [publicationCode, tag]);

        res.status(200).send("Tag added");

    }
    catch {
        res.status(500).send("Error adding tag");
    }
}
