import connection from "../config/db.js"
import urlMetadata from 'url-metadata';

export async function searchProfile(req,res){
    const {search, userId} = req.body
    try{
        const {rows} = await connection.query('SELECT id, name, avatar FROM users WHERE LOWER(name) LIKE LOWER($1)',[search.name + "%" ])

        const followed = await connection.query('SELECT "userId", "followUserId" FROM follow WHERE "userId"=$1',[userId])

        rows.forEach(row => {
            followed.rows.forEach(follow => {
                if(row.id === follow.followUserId){
                    row.follow = true
                }
            })
        })
        console.log(rows)
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
