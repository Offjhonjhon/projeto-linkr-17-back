import {Router} from 'express';
import { deletePost, editPost } from '../controllers/postController.js';

const postRouter = Router();

postRouter.post("/post-details/edit", editPost);
postRouter.delete("/post-details/delete/:postId", deletePost);

export default postRouter;