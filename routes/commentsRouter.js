import { Router } from "express"
import { getCommentsQuantity, getComments, postComment } from "../controllers/commentsController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateComment } from "../middlewares/commentValidation.js";

const commentsRouter = Router()

commentsRouter.get("/comments/count/:id", getCommentsQuantity);
commentsRouter.get("/comments/:id", getComments);
commentsRouter.post("/comments/publish", verifyToken, validateComment, postComment);

export default commentsRouter;