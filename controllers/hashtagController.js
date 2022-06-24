import connection from "../config/db.js";
import urlMetadata from 'url-metadata';

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
    const { userId } = res.locals;
    const { page, lastUpdateTime } = req.params;

    try {

        const data = await connection.query(`
            SELECT u.avatar, u.id, u.name, p.text, p.link, p.id as "postId", p."createdAt" FROM "publicationsTags" pt
            JOIN publications p ON p."publicationCode" = pt."publicationCode"
            JOIN users u ON p."userId" = u.id
            JOIN tags ON tags.tag = pt.tag
            WHERE tags.tag = $1
        `, [req.params.tag]);

        const posts = data.rows;

        const answer = [];
        for (let i = 0; i < posts.length; i++) { answer.push({}) };

        posts.forEach((post, index) => {
            urlMetadata(post.link).then(metadata => {
                answer[index].avatar = post.avatar;
                answer[index].id = post.id
                answer[index].name = post.name;
                answer[index].text = post.text;
                answer[index].title = metadata.title;
                answer[index].description = metadata.description;
                answer[index].url = post.link;
                answer[index].image = metadata.image;
                if (index === 0) { answer[0].createdAt = post.createdAt };

                answer[index].postId = post.postId

                if (userId === post.id) {
                    answer[index].isFromUser = true;
                } else {
                    answer[index].isFromUser = false;
                }


                if (!(answer.filter(e => !e.name).length)) res.send(answer);
            },
                error => {
                    answer[index].avatar = post.avatar;
                    answer[index].id = post.id
                    answer[index].name = post.name;
                    answer[index].text = post.text;
                    answer[index].title = "";
                    answer[index].description = "";
                    answer[index].url = post.link;
                    answer[index].image = "";
                    if (index === 0) { answer[0].createdAt = post.createdAt };

                    answer[index].postId = post.postId

                    if (userId === post.id) {
                        answer[index].isFromUser = true;
                    } else {
                        answer[index].isFromUser = false;
                    }

                    if (!answer.filter(e => !e.name).length) res.send(answer);
                })
        })
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
