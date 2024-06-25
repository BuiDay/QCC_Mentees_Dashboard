require('dotenv').config();
import express, { NextFunction, Request, Response } from "express"
export const app = express();
import { Error } from "./middleware/error";
import cors from 'cors';
import cookieParser from "cookie-parser";
import menteeRouter from './routes/mentee.route'
import rewardRouter from './routes/reward.route'
import authRouter from './routes/auth.route'

//body parse
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(cors({
    origin:['http://localhost:3000','http://localhost:5173'],
    credentials:true,
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/mentee', menteeRouter);
app.use('/api/v1/reward', rewardRouter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
        success: true
    })
})

app.use(Error)