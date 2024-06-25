import { CatchAsyncError } from "../utils/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { analyticsAverageScoreEachProjectService, analyticsCriterionStrengthsMenteeService, createMenteeService, getAllMenteeService, getEvaluationByMenteeService, getInfoByMenteeService, getInfoCourseByMenteeGenerateCodeService, getMenteeByIdService, getMenteeCourseService, updateAvatarMenteeService, updateInfoByMenteeService, updateInfoGenerateCodeService, updateInfoMenteeService } from "../services/mentee.service";
import validateMongodbId from "../utils/validateMongodbId";
import menteeModel from "../models/mentee.model";

export const createMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const {email,name, coursesId} = data
            if(!name || !email ){    
                return next(new ErrorHandler(" Please enter mail and name", 400));
            }
          
            createMenteeService(data,coursesId,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        } 
    }
) 

export const updateInfoMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            if(!body){
                return next(new ErrorHandler("Not founded body", 400));
            }
            updateInfoMenteeService(body,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const getAllMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            getAllMenteeService(res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const getMenteeById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            if(!id){
                return next(new ErrorHandler("Not founded id", 400));
            }
            validateMongodbId(id);
            getMenteeByIdService(id,req,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const getMenteeCourses = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            if(!id){
                return next(new ErrorHandler("Not founded id", 400));
            }
            validateMongodbId(id);
            getMenteeCourseService(id,req,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 
///////////////////////////////////////
export const updateInfoGenerateCode = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            if(!email){
                return next(new ErrorHandler("Not founded email", 400));
            }
            updateInfoGenerateCodeService(email,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const getInfoByMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {token} = req.params
            if(!token){
                return next(new ErrorHandler("Not founded token", 400));
            }
            getInfoByMenteeService(token,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const updateInfoByMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const {token} = req.params
            if(!body){
                return next(new ErrorHandler("Not founded body", 400));
            }
            updateInfoByMenteeService(body,token,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const updateAvatarMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try { 
            const {avatar} = req.body;
            const {menteeId} = req.params;
            if(!menteeId){
                return next(new ErrorHandler("Not Mentee Id", 400));
            }
            updateAvatarMenteeService(menteeId,avatar,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const analyticsCriterionStrengthsMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {menteeId} = req.params
            if(!menteeId){
                return next(new ErrorHandler("Not founded body", 400));
            }
            analyticsCriterionStrengthsMenteeService(menteeId,res,next)
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const analyticsAverageScoreEachProject= CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {menteeId} = req.params
            if(!menteeId){
                return next(new ErrorHandler("Not founded body", 400));
            }
            analyticsAverageScoreEachProjectService(menteeId,res,next)
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 
//////////////////////////////////
export const getInfoCourseByMenteeGenerateCode = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            if(!email){
                return next(new ErrorHandler("Not founded email", 400));
            }
            getInfoCourseByMenteeGenerateCodeService(email,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const getEvaluationByMentee = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {token} = req.params
            if(!token){
                return next(new ErrorHandler("Not founded token", 400));
            }
            getEvaluationByMenteeService(token,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 