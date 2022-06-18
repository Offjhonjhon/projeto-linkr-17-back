import { Router } from "express"
import { getHashtags } from "../controllers/hashtagController.js"

const hashtagRouter = Router()

hashtagRouter.get("/hashtag/:hashtag", getHashtags)


export default hashtagRouter;