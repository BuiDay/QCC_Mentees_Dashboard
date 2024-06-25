import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/errorHandler";
import assignmentModel from "../models/assignment.model";
import menteeModel from "../models/mentee.model";
import submissionModel from "../models/submission.model";
import menteeCourseModel from "../models/menteeCourse.model";
import { sortMenteeByScore } from "../utils/reward.generate";

export const submissionByMenteeService = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { assignmentId, menteeId } = req.body
        const fileUrl = req.file.path;
        const submissionDate = new Date()
        // kiểm tra thời gian nộp bài có hợp lệ
        const getAssignment = await assignmentModel.findById({ _id: assignmentId })
        const getStartDate = getAssignment.startDate.getTime() // lấy ngày bắt đầu
        const getEndDate = getAssignment.endDate.getTime() // lấy ngày kết thúc

        if (submissionDate.getTime() > getEndDate || submissionDate.getTime() <= getStartDate) {
            return next(new ErrorHandler("Đã hết thời gian nộp bài", 400));
        }


        const newSubmission = new submissionModel({
            assignment: assignmentId,
            mentee: menteeId,
            submissionDate,
            fileUrl
        });
        res.status(200).json({
            success: true,
            submission: newSubmission
        })
    } catch (error) {
        console.log(error);
    }
};

// get lịch nộp bài cho mentee
export const getAssignmentForMenteeService = async (
    menteeId,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentee = await menteeModel.findById({ _id: menteeId })
        const getCourses = mentee.courses // lấy tất cả lớp học của mentee
        const getCoursesId = getCourses.map(item => item._id)  // lấy tất cả Id lớp học của mentee
        const submissionDate = new Date()

        const getAssignment = await assignmentModel.find({
            course: getCoursesId,
            startDate: {
                $lte: submissionDate,
            },
            endDate: {
                $gte: submissionDate,
            }
        }).populate({ path: "course", select: ["course", "code"] }) // lấy tất cả phần nộp còn thời hạn

        res.status(200).json({
            success: true,
            submission: getAssignment
        })


    } catch (error) {
        console.log(error);
    }
};

// thay đổi trạng thái các bạn không nộp bài
export const markNotSubmittedAssignments = async (
    menteeId,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentee = await menteeModel.findById({ _id: menteeId })
        const getCourses = mentee.courses // lấy tất cả lớp học của mentee
        const getCoursesId = getCourses.map(item => item._id)  // lấy tất cả Id lớp học của mentee
        const submissionDate = new Date()

        const getAssignment = await assignmentModel.find({
            course: getCoursesId,
            startDate: {
                $lte: submissionDate,
            },
            endDate: {
                $gte: submissionDate,
            }
        }).populate({ path: "course", select: ["course", "code"] }) // lấy tất cả phần nộp còn thời hạn

        res.status(200).json({
            success: true,
            submission: getAssignment
        })


    } catch (error) {
        console.log(error);
    }
};


// bảng xếp hạng của mentee 
export const rankingOfMenteeService = async (
    menteeId,
    res: Response,
    next: NextFunction
) => {
    try {
        /// lấy toàn bộ khóa học của học viên trong qcc từ model khhông tính học viên đã nghỉ
        const getAllMenteesOfCourse = await menteeCourseModel.find()
            .populate({ path: "mentee", select: ["name"] })
            .populate({ path: "evaluations", select: ["averageScore", "score"] })
            .populate({ path: "course", select: ["course", "code", "endTime"] })
        //   .then((menteeCourse) => menteeCourse.filter((item: any) => new Date(item.course.endTime).getTime() > new Date().getTime()));

        /// sắp xếp theo thứ tự từ cao xuống thấp
        const sort_getAllMenteesOfCourse = await sortMenteeByScore(getAllMenteesOfCourse)

        // lấy vị trí của bạn mentee đó bằng menteeId
        const filterMenteeById = sort_getAllMenteesOfCourse.filter((item)=>item?.mentee._id.toString().includes(menteeId))[0]

        res.status(200).json({
            success: true,
            rankingOfMentee:filterMenteeById,
            rankingAllMentee:sort_getAllMenteesOfCourse.slice(0,4)
        })


    } catch (error) {
        console.log(error);
    }
};
