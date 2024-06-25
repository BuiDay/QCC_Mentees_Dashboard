import commentModel from "../models/evaluation.model";
import userModel, { IUser } from "../models/user.model";
import { CatchAsyncError } from "../utils/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import evaluationModel from "../models/evaluation.model";
import menteeCourseModel from "../models/menteeCourse.model";
import notificationModel from "../models/notification.model";
import courseModel from "../models/course.model";
import menteeModel from "../models/mentee.model";
var mongoose = require('mongoose');

export const createCommmentService = async (userID: string, data: any, res: Response, next: NextFunction) => {
    try {
        const createId = new mongoose.Types.ObjectId();
        const menteeCourseId = data.menteeCourseId
        const menteeCourse = await menteeCourseModel.findById(menteeCourseId)
        if (!menteeCourse) {
            return next(new ErrorHandler("Not Found Mentee's Course", 400));
        }
        const score = Object.values(data.score)
        const totalScore = score.reduce((accumulator: number, current: { title: string, value: string }) => accumulator = accumulator + parseInt(current.value), 0);
        const averageScore = (Number(totalScore) / score.length).toFixed(2)
        const evaluation = await evaluationModel.create({
            _id: createId,
            commentBy: userID,
            mentee: data.menteeId,
            averageScore: {
                title: "Điểm trung bình",
                value: averageScore
            },
            ...data
        })
        await menteeCourseModel.findOneAndUpdate(
            { _id: menteeCourseId },
            { $push: { evaluations: createId } },
            { new: true, upsert: false, useFindAndModify: false }
        );

        const mentor = await userModel.findById({_id:userID})
        const mentee  = await menteeModel.findById({_id:data.menteeId})
        const course  = await courseModel.findById({_id:menteeCourse.course})

        await notificationModel.create({
            title: `Đánh giá học viên lớp ${course.code} ${course.course}`,
            by: userID,
            course:menteeCourse.course,
            message: `${mentor.name}đã đánh giá ${data.projectTitle} của học viên ${mentee.name}.`,
        });

        res.status(200).json({
            success: true,
            evaluation
        })
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler("error", 400));
    }

}

export const getCommmentService = async (id: string, res: Response) => {
    const comment = await commentModel
        .find({ mentee: id })
        .populate({ path: "commentBy", select: "name" })
        .populate({ path: "mentee", select: "name" })
    res.status(200).json({
        success: true,
        comment
    })
}

