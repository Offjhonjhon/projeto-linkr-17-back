import { Router } from "express"
import { getUserProfile, searchProfile } from "../controllers/usersProfileController.js"

const usersProfileRouter = Router()

usersProfileRouter.post("/search", searchProfile)
usersProfileRouter.get("/user/:id", getUserProfile)

export default usersProfileRouter