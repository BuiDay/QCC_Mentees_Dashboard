import { NextFunction,Response,Request } from "express";
import { CatchAsyncError } from "../utils/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { awardTopMenteeService, createRewardService } from "../services/reward.service";

export const createReward = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data:any = req.body
            const {nameReward,code} = data
            if(!nameReward || !code ){    
                return next(new ErrorHandler("Not founded infomation", 400));
            }
            createRewardService(data,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        } 
    }
) 

export const awardTopMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            awardTopMenteeService(req,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        } 
    }
) 