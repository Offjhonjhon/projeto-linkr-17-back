import urlMetadata from 'url-metadata';
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

export async function getInfos(req, res) {
    const {userId} = res.locals;

    try {
        const {rows} = await connection.query(`
            SELECT u1.name as "userRepost", p."userId",
            u2.avatar, p.id, p.id as "postId", u2.name, p.text, p.link
            FROM reposts r
            JOIN publications p ON r."publicationId" = p.id
            JOIN users u1 ON r."userId" = u1.id
            JOIN users u2 ON p."userId" = u2.id
            JOIN follow f ON f."followUserId" = r."userId"
            WHERE r."userId" = $1
        `, [userId]);

        const answer = [];
        for (let i = 0; i < rows.length; i++) { answer.push({}) };

        rows.forEach((post, index) => {
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