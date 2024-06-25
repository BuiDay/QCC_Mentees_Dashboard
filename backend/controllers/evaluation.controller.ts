import { CatchAsyncError } from "../utils/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { createCommmentService, getCommmentService } from "../services/evaluation.service";
import validateMongodbId from "../utils/validateMongodbId";

export const createEvaluateEachProject = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userID = req.user?._id;
            const data = req.body;
            const {menteeId,comment, menteeCourseId} = data 
            if(!menteeId || !comment || !menteeCourseId){    
                return next(new ErrorHandler(" Please enter mentee and comment", 400));
            }
            createCommmentService(userID, data, res, next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const getCommentById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            if(!id){    
                return next(new ErrorHandler(" Please enter mentee and comment", 400));
            }
            validateMongodbId(id)
            getCommmentService(id, res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 


