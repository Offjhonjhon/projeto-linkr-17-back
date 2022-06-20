import {Router} from 'express';
import { deletePost, editPost } from '../controllers/postController.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';

const postRouter = Router();

postRouter.post("/post-details/edit",  validateToken, editPost);
postRouter.delete("/post-details/delete/:postId", validateToken, deletePost);

export default postRouter;