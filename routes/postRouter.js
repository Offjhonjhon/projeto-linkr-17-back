import {Router} from 'express';
import { editPost, postsGET, publishPOST } from '../controllers/postController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';

const postRouter = Router();

postRouter.post("/edit-post", editPost);
postRouter.get("/posts", postsGET);
postRouter.post("/publish", verifyToken, publishPOST);

export default postRouter;