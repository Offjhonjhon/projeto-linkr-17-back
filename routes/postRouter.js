import {Router} from 'express';
import { editPost, postsGET, publishPOST, deletePost } from '../controllers/postController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const postRouter = Router();

postRouter.get("/posts", verifyToken, postsGET);
postRouter.post("/publish", verifyToken, publishPOST);
postRouter.post("/post-details/edit",  verifyToken, editPost);
postRouter.delete("/post-details/delete/:postId", verifyToken, deletePost);

export default postRouter;
