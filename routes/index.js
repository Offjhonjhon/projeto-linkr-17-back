import { Router } from "express";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRouter.js";
import postRouter from "./postRouter.js";
const router = Router();

router.use(likeRouter);
router.use(authRouter);
router.use(postRouter);

export default router;