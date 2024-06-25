import { NextFunction,Response,Request } from "express";
import { CatchAsyncError } from "../../utils/catchAsyncErrors";
import ErrorHandler from "../../utils/errorHandler";
import { getAssignmentForMenteeService, rankingOfMenteeService, submissionByMenteeService } from "../../services/v2/mentee.service";

export const submissionByMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data:any = req.body
            const {assignmentId,menteeId} = data
            if(!menteeId || !assignmentId ){    
                return next(new ErrorHandler("Not founded infomation", 400));
            }
            submissionByMenteeService(req,res,next)

        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        } 
    }
) 


export const getAssignmentForMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data:any = req.body
            const {menteeId} = data
            if(!menteeId){    
                return next(new ErrorHandler("Not founded infomation", 400));
            }
            getAssignmentForMenteeService(menteeId,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        } 
    }
) 


export const rankingOfMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data:any = req.body
            // const {menteeId} = data
            const menteeId = "66345d476ee51b945668a936"
            // if(!menteeId){    
            //     return next(new ErrorHandler("Not founded infomation", 400));
            // }
            rankingOfMenteeService(menteeId,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        } 
    }
) 
