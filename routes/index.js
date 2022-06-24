import { Router } from "express";

import likeRouter from "./likeRouter.js";
import authRouter from "./authRouter.js";
import postRouter from "./postRouter.js";
import usersProfileRouter from "./usersProfileRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = Router();

router.use(likeRouter);
router.use(authRouter);
router.use(postRouter);
router.use(usersProfileRouter);
router.use(hashtagRouter);
router.use(commentsRouter);

export default router;


