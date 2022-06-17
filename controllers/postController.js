import connection from "../config/db.js";

export async function editPost(req, res) {
    const { publicationId, description } = req.body;
    console.log(publicationId, description)
    res.sendStatus(201);
}