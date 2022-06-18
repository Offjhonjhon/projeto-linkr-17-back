import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import postsRouter from './routers/postsRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(postsRouter);

const port = process.env.PORT;
app.listen(port);