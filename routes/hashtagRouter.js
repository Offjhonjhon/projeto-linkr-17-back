import { Router } from "express"
import { getTrendingHashtags, getHashtagPosts } from "../controllers/hashtagController.js"

const hashtagRouter = Router()

hashtagRouter.get("/hashtag/trending-hashtags", getTrendingHashtags)
hashtagRouter.get("/hashtag/:tag", getHashtagPosts)

export default hashtagRouter;