require('dotenv').config();
import express, { NextFunction, Request, Response } from "express"
export const app = express();
import { Error } from "./middleware/error";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route'
import menteeRouter from './routes/mentee.route'
import courseRouter from './routes/course.route'
import evaluationRouter from './routes/evaluation.route'
import userRouter from './routes/user.route'
import notificationRouter from './routes/notification.route'
import analytics from './routes/analytics.route'
import overviewRoute from './routes/overview.route'

import menteeRouterV2 from './routes/v2/mentee.route'
import rewardRouterV2 from './routes/v2/reward.route'

//body parse
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(cors({
    origin:['http://localhost:3000','http://localhost:4173'],
    credentials:true,
}));

app.use('/api/v1', authRouter);
app.use('/api/v1/mentee', menteeRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/evaluation', evaluationRouter);
app.use('/api/v1/user', userRouter);    
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/analytics', analytics);
app.use('/api/v1/overview',overviewRoute)

app.use('/api/v2/mentee', menteeRouterV2);
app.use('/api/v2/reward', rewardRouterV2);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
        success: true
    })
})

app.use(Error)