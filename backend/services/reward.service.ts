import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/errorHandler";
import rewardModel from "../models/reward.model";
import menteeCourseModel from "../models/menteeCourse.model";
import { bestStudent, findTopStudent, findTopStudentByDesign, findTopStudentByIdea, findTopStudentByInsight, findTopStudentByProposal, findTopStudentByResearch } from "../utils/reward.generate";

export const createRewardService = async (
    data,
    res: Response,
    next: NextFunction
) => {
    try {
        const reward = await rewardModel.create(data)

        res.status(200).json({
            success: true,
            reward: reward
        })
    } catch (error) {
        console.log(error);
    }
};


/// tính reward
/// lưu ý chưa có thiết lập ngày học viên còn học và 2 tuần 1 lần
export const awardTopMenteeService = async (
    data,
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

        //tính top mentee theo tiêu chí insight
        // const topInsight = await findTopStudentByInsight(getAllMenteesOfCourse)

        // lấy top 1, 5, 10, 25, 50 theo tiêu chí insight
        // hàm findTopStudent(danh sách,từ,đến)
        // const top1Insight = await findTopStudent(topInsight,`insightTop1`,1,1)
        // const top5Insight = await findTopStudent(topInsight,`insightTop5`,2,5)
        // const top10Insight = await findTopStudent(topInsight,`insightTop10`,6,10)
        // const top25Insight = await findTopStudent(topInsight,`insightTop25`,11,25)
        // const top50Insight = await findTopStudent(topInsight,`insightTop50`,26,50)

        // lấy top mentee theo tiêu chí design
        // const topDesign = await findTopStudentByDesign(getAllMenteesOfCourse)
        // const top1Design = await findTopStudent(topDesign, `designTop1`, 1, 1)
        // const top5Design = await findTopStudent(topDesign, `designTop5`, 2, 5)
        // const top10Design = await findTopStudent(topDesign, `designTop10`, 6, 10)
        // const top25Design = await findTopStudent(topDesign, `designTop25`, 11, 25)
        // const top50Design = await findTopStudent(topDesign, `designTop50`, 26, 50)

        // lấy top mentee theo tiêu chí idea
        // const topIdea = await findTopStudentByIdea(getAllMenteesOfCourse)
        // const top1Idea = await findTopStudent(topIdea, `ideaTop1`, 1, 1)
        // const top5Idea = await findTopStudent(topIdea, `ideaTop5`, 2, 5)
        // const top10Idea = await findTopStudent(topIdea, `ideaTop10`, 6, 10)
        // const top25Idea = await findTopStudent(topIdea, `ideaTop25`, 11, 25)
        // const top50Idea = await findTopStudent(topIdea, `ideaTop50`, 26, 50)

        // lấy top mentee theo tiêu chí research 
        const topResearch = await findTopStudentByResearch(getAllMenteesOfCourse)
        const top1Research = await findTopStudent(topResearch, `ideaTop1`, 1, 1)
        // const top5Research = await findTopStudent(topResearch, `ideaTop5`, 2, 5)
        const top10Research = await findTopStudent(topResearch, `ideaTop10`, 6, 10)
        const top25Research = await findTopStudent(topResearch, `ideaTop25`, 11, 25)
        // const top50Research = await findTopStudent(topResearch, `ideaTop50`, 26, 50)

        // lấy top mentee theo tiêu chí proposal 
        // const topProposal= await findTopStudentByProposal(getAllMenteesOfCourse)
        // const top1Proposal = await findTopStudent(topProposal, `ideaTop1`, 1, 1)
        // const top5Proposal = await findTopStudent(topProposal, `ideaTop5`, 2, 5)
        // const top10Proposal = await findTopStudent(topProposal, `ideaTop10`, 6, 10)
        // const top25Proposal = await findTopStudent(topProposal, `ideaTop25`, 11, 25)
        // const top50Proposal = await findTopStudent(topProposal, `ideaTop50`, 26, 50)

        const thebest = await bestStudent(getAllMenteesOfCourse)

        res.status(200).json({
            success: true,
            thebest
        })
    } catch (error) {
        console.log(error);
    }
};