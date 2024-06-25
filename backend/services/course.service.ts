
import { NextFunction, Request, Response } from "express";
import courseModel from "../models/course.model";
import notificationModel from "../models/notification.model";
import ErrorHandler from "../utils/errorHandler";
import menteeCourseModel from "../models/menteeCourse.model";


export const createCourseService = async (body, user, res: Response) => {
    const course = await courseModel.create(body);
    const userName = user?.name;
    const userId = user?._id
    await notificationModel.create({
        title: "Khóa học",
        user: body.mentor,
        by:userId,
        message: `${userName} đã thêm bạn là Mentor lớp ${body.courseName} ${body.course}`
    })
    
    res.status(200).json({
        success: true,
        course
    })
}

export const getAllCourseService = async (req: Request, res: Response) => {
    const offset = 1, limit = 100;
    const object  = {...req.query}

    let course = await courseModel.find(object)
        .populate({ path: "mentor", select: ["_id", "name"] })
        .limit(limit * 1)
        .skip((offset - 1) * limit)
        .sort({ createdAt: -1 })
        .exec()

    const count = await courseModel.count();
    res.status(200).json({
        success: true,
        course,
        totalCourse: count,
        totalPages: Math.ceil(count / limit),
        currentPage: offset
    })
}

export const getCourseByIdService = async (id: string, res: Response,) => {
    const course = await courseModel.findById(id)
    res.status(200).json({
        success: true,
        course,
    })
}


export const analyticsCoursetService = async (res: Response, next: NextFunction) => {
    try {
        const mentee = await menteeCourseModel.count()
        const current = new Date();
        var lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        console.log(lastMonth)
        const menteeLastMonth = await menteeCourseModel.find({
            createdAt: {
                $gte: new Date(lastMonth),
                $lte: current
            }
        })

        res.status(200).send({
            success: true,
            courses: {
                totalMentee:mentee,
                menteeLastMonth
            }
        })

    } catch (error) {
        console.log(error)  
    }
}