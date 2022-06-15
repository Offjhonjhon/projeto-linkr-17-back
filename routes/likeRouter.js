import { Router } from "express"
import { postLike } from "../controllers/likeController.js";
import { validateLikeData } from "../middlewares/likeDataValidationMiddleware.js";

const likeRouter = Router();

likeRouter.post("/likes", validateLikeData ,postLike);

export default likeRouter;