import { generateCourseLastDateData, generateMenteeLastDateData } from "../analytics/analyticsMonth";
import courseModel from "../models/course.model";
import menteeModel from "../models/mentee.model";
import menteeCourseModel from "../models/menteeCourse.model";
import userModel from "../models/user.model";
import { NextFunction, Request, Response } from "express";
// import { redis } from "../utils/redis";

export const analyticsMenteeLastMonthService = async (rep: Request, res: Response,next:NextFunction) => {
    const user = await generateMenteeLastDateData(menteeCourseModel)
    res.status(200).json({
        success: true,
        data:user.data
    })
}

export const analyticsCourseLastMonthService = async (rep: Request, res: Response,next:NextFunction) => {
    const user = await generateCourseLastDateData(menteeCourseModel)
    res.status(200).json({
        success: true,
        data:user.data
    })
}