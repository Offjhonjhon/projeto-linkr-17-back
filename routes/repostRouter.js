import { Router } from "express";

import { getInfos, getAllReposts, postRepost } from "../controllers/repostController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const repostRouter = Router();

repostRouter.get("/reposts/:id", getAllReposts);
repostRouter.get("/reposts", verifyToken, getInfos);
repostRouter.post("/reposts", verifyToken, postRepost);

export default repostRouter;