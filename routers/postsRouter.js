import express from 'express';


import { postsGET } from './../controllers/postsController.js';


const postsRouter = express.Router();


postsRouter.get("/posts", postsGET);


export default postsRouter;