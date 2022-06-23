import connection from "../config/db.js"
import urlMetadata from 'url-metadata';

export async function searchProfile(req,res){
    const search = req.body
    try{
        const {rows} = await connection.query('SELECT id, name, avatar FROM users WHERE LOWER(name) LIKE LOWER($1)',[search.name + "%" ])
        res.status(200).send(rows)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}

export async function getUserProfile(req, res) {
    const {id} = req.params

        try {

            const result = await connection.query('SELECT u.avatar, u.name, p.text, p.link, p.id as "postId" FROM publications p JOIN users u ON p."userId" = u.id WHERE u.id = $1 ORDER BY p."createdAt" DESC LIMIT 20',[id]);
            const posts = result.rows
    
            if (posts.length === 0) {
                const {rows} = await connection.query('SELECT users.name FROM users WHERE id=$1',[id])
                res.send({status:"Empty", name: rows[0].name});
                return;
            }
    
            const answer = [];
            for (let i = 0; i < posts.length; i++) { answer.push({}) };
    
            posts.forEach((post, index) => {
                urlMetadata(post.link).then(metadata => {
                    answer[index].avatar = post.avatar;
                    answer[index].name = post.name;
                    answer[index].text = post.text;
                    answer[index].title = metadata.title;
                    answer[index].description = metadata.description;
                    answer[index].url = post.link;
                    answer[index].image = metadata.image;
                    answer[index].status = "Filled";
                    answer[index].id = post.id
                    answer[index].postId = post.postId

                    if (!answer.filter(e => !e.name).length) res.send(answer);
                })
            })
    
    
    } catch (error) {
        console.log(`postsGET - ${error}`);
        res.sendStatus(500);
    }
}

export async function followUser(req, res) {
    const { userId } = res.locals;
    const { userPageId } = req.body;

    if (userId === userPageId) {
        res.status(401).send("Dados inválidos!")
    }

    try {
        const { rows } = await connection.query('SELECT * FROM follow WHERE "userId" = $1 AND "followUserId" = $2', [userId, userPageId]);
        
        if (rows.length === 0) {
            await connection.query('INSERT INTO follow ("userId", "followUserId") VALUES ($1, $2)', [userId, userPageId]);
            return res.send("followed");
        } else {
            await connection.query('DELETE FROM follow WHERE "userId" = $1 and "followUserId" = $2', [userId, userPageId]);
            return res.send("unfollowed");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export async function checkFollow(req, res) {
    const { userId } = res.locals;
    const { userPageId } = req.body;

    try {
        const { rows } = await connection.query('SELECT * FROM follow WHERE "userId" = $1 AND "followUserId" = $2', [userId, userPageId]);

        if (rows[0]) {
            return res.send({status: "followed"});
        } else {
            return res.send({status: "not followed"});
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}