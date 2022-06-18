import connection from "./../config/db.js";
import urlMetadata from 'url-metadata';


export async function postsGET(req, res) {
    try {
        
        const result = await connection.query('SELECT u.avatar, u.name, p.text, p.link FROM publications p JOIN users u ON p."userId" = u.id ORDER BY p."createdAt" DESC LIMIT 20');
        const posts = result.rows

        if (posts.length === 0) {
            res.send("Empty");
            return;
        }
        
        const answer = [];
        for(let i = 0; i < posts.length; i++) {answer.push({})};
        
        posts.forEach ((post, index) => {
            urlMetadata(post.link).then(metadata => {
                    answer[index].avatar = post.avatar;
                    answer[index].name = post.name;
                    answer[index].text = post.text;
                    answer[index].title = metadata.title;
                    answer[index].description = metadata.description;
                    answer[index].url = post.link;
                    answer[index].image = metadata.image;
                    if (!answer.filter(e => !e.name).length) res.send(answer);
                })
        })
        

    } catch (error) {
        console.log(`postsGET - ${error}`);
        res.sendStatus(500);
    }
}


export async function publishPOST(req, res) {
    try {

        const post = req.body;

        /* VALIDATION (JOI) */

        const postSchema = joi.object({
            url: joi.string().uri().required(),
            text: joi.string()
        });

        const validation = postSchema.validate(post);

        if (validation.error) {
            console.log(`publishPOST/VALIDATION (JOI) - ${validation.error}`);
            res.sendStatus(422);
            return;
        }

        /* SAVE TO DATABASE */
        
        await connection.query('INSERT INTO users ("userId", text, link) VALUES ($1, $2, $3)', [8, post.text, post.url]);
        res.sendStatus(201);
        

    } catch (error) {
        console.log(`publishPOST - ${error}`);
        res.sendStatus(500);
    }
}