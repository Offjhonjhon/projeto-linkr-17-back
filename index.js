import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import usersProfileRouter from "./routes/usersProfileRouter.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(usersProfileRouter)

app.listen(process.env.PORT)