import { Router } from "express"
import { getUserLikes, postLike } from "../controllers/likeController.js";
import { validateLikeData } from "../middlewares/likeDataValidationMiddleware.js";

const likeRouter = Router();

likeRouter.post("/likes", validateLikeData ,postLike);
likeRouter.post("/userLikes", validateLikeData, getUserLikes)

export default likeRouter;