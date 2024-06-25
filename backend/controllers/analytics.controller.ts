import { CatchAsyncError } from "../utils/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { analyticsCourseLastMonthService, analyticsMenteeLastMonthService } from "../services/analytics.service";

export const analyticsMenteeLastMonth = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsMenteeLastMonthService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const analyticsCourseLastMonth = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsCourseLastMonthService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 