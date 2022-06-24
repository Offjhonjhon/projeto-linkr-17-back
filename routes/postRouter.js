import {Router} from 'express';
import { editPost, postsGET, newPostsGET, publishPOST, deletePost } from '../controllers/postController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const postRouter = Router();

postRouter.get("/posts/page/:page/:lastUpdateTime", verifyToken, postsGET);
postRouter.get("/newposts/:lastUpdateTime", verifyToken, newPostsGET);
postRouter.post("/publish", verifyToken, publishPOST);
postRouter.post("/post/edit",  verifyToken, editPost);
postRouter.delete("/post/delete/:postId", verifyToken, deletePost);

export default postRouter;
