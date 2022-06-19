import { Router } from "express"
import { getHashtags, getHashtagPosts } from "../controllers/hashtagController.js"

const hashtagRouter = Router()

hashtagRouter.get("/hashtag/trending-hashtags", getHashtags)
hashtagRouter.get("/hashtag/:tag", getHashtagPosts)


export default hashtagRouter;