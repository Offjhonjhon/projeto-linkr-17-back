import connection from "../config/db.js"

export async function goToProfile(req,res){
    const search = req.body
    try{
        const db =  connection
        const userId = await db.query('SELECT id, name, avatar FROM users WHERE LOWER(name) LIKE LOWER($1)',[search.name + "%" ])
        res.status(200).send(userId.rows)
    }catch(e){
        console.log(e)
        res.status(500).send(e)
    }
}