import connection from "../config/db.js"

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

export async function getUserProfile(req,res){
    const {id} = req.params
    try{
        const {rows} = await connection.query('SELECT * FROM publications WHERE "userId" = $1',[id])
        res.status(200).send(rows)
    }catch(e){
        res.status(500).send(e)
    }
}