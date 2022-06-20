import { Router } from "express"
import { getTrendingHashtags, getHashtagPosts, postPublicationTag } from "../controllers/hashtagController.js"

const hashtagRouter = Router()

hashtagRouter.get("/hashtag/trending-hashtags", getTrendingHashtags)
hashtagRouter.get("/hashtag/:tag", getHashtagPosts)
hashtagRouter.post("/hashtag/tag", postPublicationTag)

export default hashtagRouter;