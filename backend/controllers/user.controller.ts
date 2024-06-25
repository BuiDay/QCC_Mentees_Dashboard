import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../utils/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import userModel from "../models/user.model";
import { createAssignmentByMentorService, getAllMenteesOfCourseService, getAllMentorService, getAllUserService, getCourseByMentorService, getListMenteesOfCourseService } from "../services/user.service";
import validateMongodbId from "../utils/validateMongodbId";

export const getAllMentor = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            getAllMentorService(res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const getAllUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            getAllUserService(res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const getCourseByMentor = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id
            validateMongodbId(userId);
            if(!userId){
                return next(new ErrorHandler("Error", 400));
            }
            getCourseByMentorService(userId,res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const getListMenteesOfCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;
            const courseId = req.params.id;

            validateMongodbId(userId);
            validateMongodbId(courseId)

            if(!userId){
                return next(new ErrorHandler("Error", 400));
            }
            getListMenteesOfCourseService(userId,courseId,req,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const getAllMenteesOfCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id;
            if(!userId){
                return next(new ErrorHandler("Error", 400));
            }
            getAllMenteesOfCourseService(req,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);


export const createAssignmentByMentor = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try { 
            const {course,startDate,projectName} = req.body
            if(!course || !startDate || !projectName){
                return next(new ErrorHandler("Vui lòng điền đầy đủ nội dung", 400));
            }
            createAssignmentByMentorService(req,res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);