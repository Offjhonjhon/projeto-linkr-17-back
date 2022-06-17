import { Router } from "express";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRouter.js";
const router = Router();

router.use(likeRouter);
router.use(authRouter);

export default router;