import { Router } from "express";
import usersProfileRouter from "./usersProfileRouter.js";
import hashtagRouter from "./hashtagRouter.js";


const router = Router();

router.use(usersProfileRouter);
router.use(hashtagRouter);

export default router;
