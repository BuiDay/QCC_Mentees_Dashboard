import { CatchAsyncError } from "../utils/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { analyticsCoursetService, createCourseService, getAllCourseService, getCourseByIdService } from "../services/course.service";

export const createCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const user = req.user
            const { courseName, course } = data
            if (!courseName || !course) {
                return next(new ErrorHandler(" Please enter courseName and course", 400));
            }
            createCourseService(data,user, res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
)

export const getAllCourses = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCourseService(req,res)
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 400));
    }
}) 

export const getCourseById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            if (!id) {
                return next(new ErrorHandler("Not found course id", 400));
            }
            getCourseByIdService(id, res)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
)


export const analyticsCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsCoursetService(res,next)
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 