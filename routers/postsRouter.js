import express from 'express';


import { postsGET, publishPOST } from './../controllers/postsController.js';


const postsRouter = express.Router();


postsRouter.get("/posts", postsGET);
postsRouter.post("/publish", publishPOST);


export default postsRouter;