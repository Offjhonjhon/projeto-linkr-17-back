import { Router } from "express";

import { getAllReposts, postRepost } from "../controllers/repostController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const repostRouter = Router();

repostRouter.get("/reposts/:id", getAllReposts);
repostRouter.post("/reposts", verifyToken, postRepost);

export default repostRouter;