import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import ErrorHandler from "../utils/errorHandler";
import menteeModel from "../models/mentee.model";
import menteeCourseModel from "../models/menteeCourse.model";
import { options } from "axios";
import assignmentModel from "../models/assignment.model";

export const getAllMentorService = async (res: Response) => {
    const mentor = await userModel.find({
        role: "mentor"
    }).select("name")
    res.status(200).json({
        success: true,
        mentor
    })
}

export const getAllUserService = async (res: Response) => {
    const user = await userModel.find()
    res.status(200).json({
        success: true,
        user
    })
}

export const getCourseByMentorService = async (userId: string, res: Response) => {
    const course = await courseModel.find({
        mentor: userId
    })
    res.status(200).json({
        success: true,
        course
    })
}

export const getListMenteesOfCourseService = async (userId: string, courseId: string, req: Request, res: Response, next: NextFunction) => {
    try {
        const object: any = { ...req.query }
        const course = await courseModel.findById(courseId)
        const offset = object?.offset || 1;
        const limit = object?.limit || 30;
        const keywords: string = !object?.keywords ? "" : object?.keywords?.toLowerCase();
        const user = await userModel.findById(userId)
        const userRole = user.role;

        if (!course) {
            return next(new ErrorHandler("Not found course", 400));
        }

        var term = new RegExp(keywords, 'i');

        const listMenteesCourse = await menteeCourseModel.find({ course: courseId })
            .populate({ path: "mentee", match: { name: { $regex: term } } })
            .populate({ path: "evaluations", select: "projectTitle" })
            .populate({ path: "course", select: ["courseName", "course", "code"] })
            .limit(limit * 1)
            .skip((offset - 1) * limit)
            .exec()
            .then((courses) => courses.filter((course: any) => course.mentee !== null));
        const totalMenteesCourse = await menteeCourseModel.count({ course: courseId })
        const listMenteeCourse = {
            course: `${course.courseName} ${course.course}`,
            mentees: listMenteesCourse,
            currentMentees: listMenteesCourse.length,
            totalMentees: totalMenteesCourse,
            totalPages: Math.ceil(totalMenteesCourse / limit),
            currentPage: Number(offset),
        }

        if (userRole.includes('mentor') && userRole.length === 1) {
            const mentorCousrse = course.mentor.toString()
            if (!mentorCousrse.includes(userId)) {
                return next(new ErrorHandler("Mentor not allowed to access this course", 400));
            }
        }

        res.status(200).json({
            success: true,
            ...listMenteeCourse
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllMenteesOfCourseService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const object: any = { ...req.query }


        const keywords = object.keywords || ""
        const keywordsProvince = object.province || ""

        const keywordsUniversity = object.university || ""
        const sortFinalGrade = object.sortFinalGrade ? { "finalGrade": object.sortFinalGrade } : {}
        const filterCourseId = { _id: object.course }

        const finalGradeGTE = Number(object.min);
        const finalGradeLTE = Number(object.max);

        const yearOfBirth = object.age && (new Date().getFullYear() - object.age) || "";

        var term = new RegExp(keywords, 'i');

        let allMenteeCourse = await menteeCourseModel.find()
            .populate({ path: "mentee", match: { name: { $regex: term }}, select: ["name", "name", "menteeId", "finalGrade", 'isUpdate', "address","yearOfBirth","universityName"] })
            .sort(sortFinalGrade)
            // .populate({path:"evaluations",options: { sort:{'score.psychologicalBehavioral':1} }})
            .populate({ path: "evaluations", options: { sort: {} } })
            .populate({ path: "course", match: filterCourseId, select: ['course', 'code'] })
            .then((data) => data.filter((item) => item.course !== null && item.mentee !== null));

        if(keywordsProvince){
            allMenteeCourse = allMenteeCourse.filter((item:any)=>{return item.mentee.address.province && item.mentee.address.province.length > 0 && item.mentee.address.province?.includes(keywordsProvince)})
        }

        if(yearOfBirth){
            allMenteeCourse = allMenteeCourse.filter((item:any)=>item.mentee.yearOfBirth ===  yearOfBirth)
        }

        if(keywordsUniversity){
            const keywordsUniversityLowcase = keywordsUniversity?.toLowerCase()
            console.log(allMenteeCourse)
            allMenteeCourse = allMenteeCourse.filter((item:any)=>item.mentee.universityName?.toLowerCase().includes(keywordsUniversityLowcase))
        }
        if(finalGradeGTE || finalGradeLTE){
            allMenteeCourse = allMenteeCourse.filter((item:any)=>item?.finalGrade >= finalGradeGTE && item?.finalGrade <= finalGradeLTE)
        }

        res.status(200).json({
            success: true,
            allMenteeCourse
        })
    } catch (error) {
        console.log(error)
    }
}

export const createAssignmentByMentorService = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const courseId = body.course
        const assignment = await assignmentModel.create(body)
        if (assignment) {
            const course = await courseModel.findById({ _id: courseId })
            course.projectIndex = course.projectIndex + 1
            course.save()
        }
        res.status(200).json({
            success: true,
            assignment
        })
    } catch (error) {
        console.log(error)
    }
}

