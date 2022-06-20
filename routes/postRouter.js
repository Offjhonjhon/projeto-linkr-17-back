import { Router } from 'express';
import { deletePost, editPost } from '../controllers/postController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const postRouter = Router();

postRouter.post("/post-details/edit",  verifyToken, editPost);
postRouter.delete("/post-details/delete/:postId", verifyToken, deletePost);

export default postRouter;
