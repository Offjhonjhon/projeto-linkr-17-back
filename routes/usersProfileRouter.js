import { Router } from "express"
import { checkFollow, followUser, getUserProfile, searchProfile, getFollows } from "../controllers/usersProfileController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const usersProfileRouter = Router()

usersProfileRouter.post("/search", searchProfile)
usersProfileRouter.get("/user/:id", getUserProfile)
usersProfileRouter.post("/user/follow", verifyToken, followUser)
usersProfileRouter.post("/check-follow", verifyToken, checkFollow)
usersProfileRouter.get("/comments/follow", verifyToken, getFollows)

export default usersProfileRouter