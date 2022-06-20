import { Router } from "express"
import { getAllLikes, postLike } from "../controllers/likeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateLikeData } from "../middlewares/likeDataValidationMiddleware.js";

const likeRouter = Router();

likeRouter.post("/likes",  verifyToken, validateLikeData ,postLike);
likeRouter.post("/userLikes", verifyToken, validateLikeData, getAllLikes)

export default likeRouter;