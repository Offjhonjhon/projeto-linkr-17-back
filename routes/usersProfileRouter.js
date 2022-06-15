import { Router } from "express"
import { getUserProfile, searchProfile } from "../controllers/usersProfileController.js"

const usersProfileRouter = Router()

usersProfileRouter.get("/search", searchProfile)
usersProfileRouter.get("/user/:id", getUserProfile)

export default usersProfileRouter