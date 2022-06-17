import { Router } from "express";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRouter.js";
import usersProfileRouter from "./usersProfileRouter.js";
const router = Router();

router.use(likeRouter);
router.use(authRouter);
router.use(usersProfileRouter);

export default router;