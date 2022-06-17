import {Router} from 'express';
import { editPost } from '../controllers/postController.js';

const postRouter = Router();

postRouter.post("/edit-post", editPost);

export default postRouter;