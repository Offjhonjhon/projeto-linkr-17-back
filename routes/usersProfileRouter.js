import { Router } from "express"
import { goToProfile } from "../controllers/usersProfileController.js"

const usersProfileRouter = Router()

usersProfileRouter.get("/search", goToProfile)

export default usersProfileRouter