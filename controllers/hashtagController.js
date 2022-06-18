import connection from "../config/db.js";

export async function getHashtags(req, res) {
    const { hashtag } = req.params;
    console.log(hashtag);
    res.send(hashtag);
}