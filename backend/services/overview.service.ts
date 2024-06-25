import { NextFunction, Request, Response } from "express";
import menteeCourseModel from "../models/menteeCourse.model";
import menteeModel from "../models/mentee.model";
import _ from 'lodash'
import moment from 'moment';

import evaluationModel from "../models/evaluation.model";
import courseModel from "../models/course.model";

let momentOne = moment()
moment.locale('vn')
interface MonthData {
    month: string;
    count: number;
}

interface DateData {
    date: string;
    count: number;
}


// phân tích độ tuổi của tất cả học viên
export const analyticsAgeAllMenyteesService = async (rep: Request, res: Response, next: NextFunction) => {
    try {
        /// lấy toàn bộ học viên từ model
        const mentees = await menteeModel
            .find().select("yearOfBirth")
            .then((years) => years.filter((item) => item.yearOfBirth > 1900));

        const yearCurrent = new Date().getFullYear()
        /// Tách year vào chung 1 mảng và tính tuổi
        let arrAges = mentees.map(year => {
            return yearCurrent - year.yearOfBirth
        })
        console.log(arrAges.length)
        /// tạo 1 mảng chứa phân loại theo từng độ tuổi
        const arrAnalyticAge = [];

        /// xử lý tạo object theo như biểu đồ {x,y}
        arrAges.forEach((item) => {
            const selectAge = arrAges.filter((age) => item === age)
            const data = {
                x: item,
                y: selectAge.length
            }
            arrAnalyticAge.push(data)
        })
        //Loại age trùng nhau
        const uniqueAgeArr = _.uniqBy(arrAnalyticAge, "x");
        let sorted_uniqueAgeArr = _.sortBy(uniqueAgeArr, ['x']);
        res.status(200).json({
            success: true,
            data: sorted_uniqueAgeArr
        })

    } catch (error) {
        console.log(error)
    }
}

export const analyticsProvinceAllMenteesService = async (rep: Request, res: Response, next: NextFunction) => {
    try {
        /// lấy toàn bộ học viên từ model
        const mentees = await menteeModel
            .find().select("address")
            .then((years) => years.filter((item) => item.address.province !== undefined && item.address.province !== ""));

        /// lấy từng tỉnh thành và đưa vào mảng
        const arrProvinces = mentees.map((item) => item.address.province)

        //đếm số lượng từng tỉnh thành và đưa vào mảng object

        const arrObjectProvinces = [];
        arrProvinces.forEach((province) => {
            const filterProvince = arrProvinces.filter((item) => item === province)

            const data = {
                name: province,
                count: filterProvince.length

            }
            arrObjectProvinces.push(data)
        })

        const uniqueProvinceArr = _.uniqBy(arrObjectProvinces, "name");
        let sorted_uniqueAgeArr = _.sortBy(uniqueProvinceArr, 'count').reverse();
        res.status(200).json({
            success: true,
            data: sorted_uniqueAgeArr,
            total: sorted_uniqueAgeArr.length
        })

    } catch (error) {
        console.log(error)
    }
}

export const analyticsRankMenteesService = async (rep: Request, res: Response, next: NextFunction) => {
    try {
        /// lấy toàn bộ khóa học của học viên trong qcc từ model khhông tính học viên đã nghỉ
        const menteeCourses = await menteeCourseModel.find()
            .populate({ path: "mentee", select: ["name"] })
            .populate({ path: "evaluations", select: ["averageScore", "projectTitle"] })
            .populate({ path: "course", select: ["course", "code", "endTime"] })
            .then((menteeCourse) => menteeCourse.filter((item: any) => new Date(item.course.endTime).getTime() > new Date().getTime()));

        let arrObjectScoreMenteeArr = []
        /// tính điểm trung bình trong tất cả các project
        menteeCourses.forEach((mentee, index) => {
            if (mentee.evaluations.length > 0) {
                const getAverageScoreEachProject = mentee.evaluations.map((score: any) => score.averageScore.value)
                //lấy điểm trung bình
                const totalScoreAllProject = getAverageScoreEachProject.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue)
                }, 0)
                if (totalScoreAllProject) {
                    const temp = {
                        course: mentee.course,
                        mentee: mentee.mentee,
                        averageScoreAllProject: Number((totalScoreAllProject / mentee.evaluations.length).toFixed(2)),
                        countProject: mentee.evaluations.length,
                    }
                    arrObjectScoreMenteeArr.push(temp)
                    mentee.finalGrade = Number((totalScoreAllProject / mentee.evaluations.length).toFixed(2))
                    mentee.save()
                }
            }
        })

        let sorted_arrObjectScoreMenteeArr = _.sortBy(arrObjectScoreMenteeArr, 'averageScoreAllProject').reverse();

        // lấy top 10
        const top15 = sorted_arrObjectScoreMenteeArr.slice(0, 14);


        res.status(200).json({
            success: true,
            data: top15,
            totalMentee: menteeCourses.length
        })

    } catch (error) {
        console.log(error)
    }
}

//
export const analyticsAverageScoreAllMenteesService = async (rep: Request, res: Response, next: NextFunction) => {
    try {

        function getDaysInMonth(year, month) {
            return moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
        }

        const currentYear = momentOne.year();
        const currentMonth = momentOne.month()

        let last12Months = []

        for (let i = 4; i <= currentMonth; i++) {
            const endDate = moment({ year: 2024, month: i, day: getDaysInMonth(currentYear, i + 1) });
            const startDate = moment({ year: 2024, month: i, day: 1 });
            const monthYear = moment(endDate).format("MM-YYYY");

            //lấy các đánh giá ra theo từng tháng
            const menteeCourses = await evaluationModel.find({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).select("averageScore")

            let max = 0
            let value455 = 0 // 4.5  đến 5
            let value445 = 0 // 4  đến 4.5
            let value354 = 0 // 3.5 đến 4
            let value335 = 0 // 3  đến 3.5
            let value253 = 0 // 2.5  đến 3
            let value225 = 0 // 2  đến 2.5
            let value152 = 0 // 1.5  đến 2
            let value115 = 0 // 1  đến 1.5
            let value051 = 0 // 0.5  đến 1
            let value005 = 0 // 0  đến 0.5
            let min = 0
            //lọc mentee theo từng tháng
            menteeCourses.forEach((item) => {
                if (Number(item.averageScore.value) === 5) {
                    max = max + 1;
                } else if (Number(item.averageScore.value) < 5 && Number(item.averageScore.value) >= 4.5) {
                    value455 = value455 + 1;
                } else if (Number(item.averageScore.value) < 4.5 && Number(item.averageScore.value) >= 4) {
                    value445 = value445 + 1;
                } else if (Number(item.averageScore.value) < 4 && Number(item.averageScore.value) >= 3.5) {
                    value354 = value354 + 1;
                } else if (Number(item.averageScore.value) < 3.5 && Number(item.averageScore.value) >= 3) {
                    value335 = value335 + 1;
                } else if (Number(item.averageScore.value) < 3 && Number(item.averageScore.value) >= 2.5) {
                    value253 = value253 + 1;
                } else if (Number(item.averageScore.value) < 2.5 && Number(item.averageScore.value) >= 2) {
                    value225 = value225 + 1;
                } else if (Number(item.averageScore.value) < 2 && Number(item.averageScore.value) >= 1.5) {
                    value152 = value152 + 1;
                } else if (Number(item.averageScore.value) < 1.5 && Number(item.averageScore.value) >= 1) {
                    value115 = value115 + 1;
                } else if (Number(item.averageScore.value) < 1 && Number(item.averageScore.value) >= 0.5) {
                    value051 = value051 + 1;
                } else if (Number(item.averageScore.value) < 0, 5 && Number(item.averageScore.value) >= 0) {
                    value005 = value005 + 1;
                } else {
                    min = min + 1;
                }
            })

            last12Months.push(
                {
                    month: monthYear,
                    data: {
                        min,
                        value005,
                        value051,
                        value115,
                        value152,
                        value225,
                        value253,
                        value335,
                        value354,
                        value445,
                        value455,
                        max
                    },
                    totalProject: menteeCourses.length
                }
            );
        }

        res.status(200).json({
            success: true,
            last12Months
        })

    } catch (error) {
        console.log(error)
    }
}

// phân tích tổng số học viên
export const analyticsOverviewAmountMenteesService = async (rep: Request, res: Response, next: NextFunction) => {
    try {

        const totalMentees = await menteeModel.countDocuments() // số học viên trong qcc
        const totalMenteesCoures = await menteeCourseModel.countDocuments() // số học viên tính theo lớp

        const getCourses = await courseModel.find();

        const codeCourses = ["SMS", "CF", "MC"];

        let classifyCourse = {}

        codeCourses.forEach((item) => {
            const data = getCourses.filter((course) => course.code.includes(item));
            if (data) {
                const amount = data.reduce((accumulator, currentValue) => {
                    return accumulator + Number(currentValue.countMentee)
                }, 0)
                classifyCourse =
                {
                    ...classifyCourse,
                    [item]: amount
                }
            }
        })

        res.status(200).json({
            success: true,
            data: {
                totalMentees,
                totalMenteesCoures,
                classifyCourse
            }
        })

    } catch (error) {
        console.log(error)
    }
}