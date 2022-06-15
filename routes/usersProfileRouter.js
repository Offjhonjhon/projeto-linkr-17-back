import { Router } from "express"
import { getUserProfile, goToProfile } from "../controllers/usersProfileController.js"

const usersProfileRouter = Router()

usersProfileRouter.get("/search", goToProfile)
usersProfileRouter.get("/user/:id", getUserProfile)

export default usersProfileRouter