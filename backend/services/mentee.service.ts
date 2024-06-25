import { NextFunction, Request, Response } from "express";
import menteeModel from "../models/mentee.model";
import userModel from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";
import courseModel from "../models/course.model";
import crypto from "crypto";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";
import menteeCourseModel from "../models/menteeCourse.model";
import evaluationModel from "../models/evaluation.model";
import cloudinary from "cloudinary";
var mongoose = require("mongoose");
const _ = require('lodash');

export const createMenteeService = async (
    body,
    coursesId,
    res: Response,
    next: NextFunction
) => {
    try {
        const existsMentee = await menteeModel.findOne({ email: body.email });
        if (existsMentee) {
            const createId = new mongoose.Types.ObjectId();
            const course = await courseModel.findById({ _id: coursesId[0] });
            if (!course) {
                return next(new ErrorHandler("Not found course", 400));
            }
            course.countMentee = course.countMentee + 1;
            course.save();
            const courseTemp = {
                _id: coursesId[0],
                name: `${course?.courseName} ${course?.course}`,
            };
            await menteeCourseModel.create({
                _id: createId,
                mentee: existsMentee._id,
                course: coursesId[0],
            });
            existsMentee.courses = [...existsMentee.courses, courseTemp];
            existsMentee.save();
            res.status(200).json({
                success: true,
                mentee: existsMentee,
            });
        } else {
            const id = new mongoose.Types.ObjectId();
            const newBody = { ...body, _id: id, menteeId: id };
            const mentee = await menteeModel.create(newBody);
            let menteeCoursesId = [];
            let menteeMSSV;
            coursesId.forEach(async (courseId, index) => {
                const createId = new mongoose.Types.ObjectId();
                const course = await courseModel.findById({ _id: courseId });
                if (!course) {
                    return next(new ErrorHandler("Not found course", 400));
                }
                if (index === 0) {
                    const courseName = course?.code;
                    menteeMSSV = `${courseName}${crypto
                        .randomInt(0, 10 ** 6 - 1)
                        .toString()
                        .padStart(6, "0")}`;
                }
                const courseTemp = {
                    _id: courseId,
                    name: `${course?.courseName} ${course?.course}`,
                };
                menteeCoursesId.push(courseTemp);
                await menteeCourseModel.create({
                    _id: createId,
                    mentee: id,
                    course: courseId,
                });
                course.countMentee = course.countMentee + 1;
                course.save();
                if (index === coursesId.length - 1) {
                    mentee.menteeId = menteeMSSV;
                    mentee.courses = menteeCoursesId;
                    mentee.save();
                }
            });

            res.status(200).json({
                success: true,
                mentee: mentee,
            });
        }
    } catch (error) {
        next();
        console.log(error);
    }
};

export const updateInfoMenteeService = async (
    body,
    res: Response,
    next: NextFunction
) => {
    try {
        const menteeId = body.id;
        const courseId = body.courseId;
        const mentee = await menteeModel.findById(menteeId);

        if (!mentee) {
            return next(new ErrorHandler("Not found mentee", 400));
        }

        const menteeCourseId = mentee.courses.map((item) => item._id.toString());

        let isEqual = true;

        if (courseId.length < menteeCourseId.length) {
            isEqual = false;
        }
        if (courseId.length === menteeCourseId.length) {
            for (let i = 0; i < courseId.length; i++) {
                if (courseId[i] !== menteeCourseId[i]) {
                    isEqual = false;
                    break;
                }
                isEqual = true;
            }
        }

        if (!isEqual) {
            return next(
                new ErrorHandler("Bạn chỉ được phép đăng kí thêm lớp học", 400)
            );
        }

        const newInfoMente = await menteeModel.findOneAndUpdate(
            {
                _id: menteeId,
            },
            {
                ...body,
            },
            {
                new: true,
            }
        );

        // Lấy các phần tử có trong courseId nhưng không có trong menteeCourseId
        const temp = courseId.length - menteeCourseId.length;
        const uniqueToCourseId = courseId.filter(
            (item) => !menteeCourseId.includes(item)
        );
        if (temp !== uniqueToCourseId.length) {
            return next(new ErrorHandler("Bạn không được phép đổi lớp học", 400));
        }

        if (uniqueToCourseId) {
            let menteeCoursesId: any = mentee.courses.map((item) => {
                return {
                    _id: item._id.toString(),
                    name: item.name,
                };
            });
            uniqueToCourseId.forEach(async (courseId, index) => {
                const course = await courseModel.findById({ _id: courseId });

                if (!course) {
                    return next(new ErrorHandler("Not found course", 400));
                }

                const createId = new mongoose.Types.ObjectId();

                const courseTemp = {
                    _id: courseId,
                    name: `${course?.courseName} ${course?.course}`,
                };

                menteeCoursesId.push(courseTemp);
                console.log(menteeCoursesId);
                await menteeCourseModel.create({
                    _id: createId,
                    mentee: menteeId,
                    course: courseId,
                });
                course.countMentee = course.countMentee + 1;
                course.save();
                if (index === uniqueToCourseId.length - 1) {
                    mentee.courses = menteeCoursesId;
                    mentee.save();
                }
            });
        }
        res.status(200).json({
            success: true,
            mentee: newInfoMente,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllMenteeService = async (res: Response) => {
    const offset = 1,
        limit = 100;
    const mentees = await menteeModel
        .find()

        .populate({ path: "courses", select: ["courseName", "course"] })
        .select([
            "-linkPortfolio",
            "-linkProject",
            "-comment",
            "-address",
            "-phone",
            "-universityName",
            "-createdAt",
        ])
        .limit(limit * 1)
        .skip((offset - 1) * limit)
        .exec();

    const count = await menteeModel.count();

    //    const x = async () => {
    //         return mentees.map( async item=>{
    //                 const evaluations = await evaluationModel.find({mentee:item._id})
    //                 const temp = {...item,evaluations:evaluations}
    //                 console.log(temp)
    //                 return temp
    //             })
    //    }

    //     x.then(v => console.log(v))

    res.status(200).json({
        success: true,
        totalMentees: count,
        totalPages: Math.ceil(count / limit),
        currentPage: offset,
        mentees: mentees,
    });
};

export const getMenteeByIdService = async (
    id: string,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const role = req.user.role;
        if (role.includes("admin") || role.includes("moderator")) {
            const mentee = await menteeModel.findById(id);
            res.status(200).json({
                success: true,
                mentee,
            });
        } else {

            function hasCommonElement(arr1, arr2) {
                // Sử dụng lodash intersection để tìm các phần tử chung giữa hai mảng
                return _.intersection(arr1, arr2).length > 0;
            }

            const mentorId = req.user._id;
            const mentee = await menteeModel.findById(id);
            const getCoursesMentor = (await courseModel.find({ mentor: mentorId }).select("_id")).map(item=>item._id.toString())
            const getCoursesMentee = (await menteeModel.findById(id).select("courses._id")).courses.map(item=>item._id.toString());

            if ( hasCommonElement(getCoursesMentor, getCoursesMentee)) {
                res.status(200).json({
                    success: true,
                    mentee,
                });
            } else {
                return next(new ErrorHandler("NOt find mentee", 400));
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const getMenteeCourseService = async (
    id: string,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let menteeCourse = await menteeCourseModel
            .find({
                mentee: id,
            })
            .populate([
                { path: "course", select: ["courseName", "course", "code", "mentor"] },
                { path: "evaluations" },
            ])
            .select("-mentee");
        console.log(menteeCourse);
        if (!menteeCourse) {
            return next(new ErrorHandler("Not found mentee's course", 400));
        }

        const mentor = req.user.role;

        if (mentor.includes("mentor") && mentor.length === 1) {
            const mentorId = req.user._id;
            const x = menteeCourse.filter((item: any) =>
                item?.course?.mentor?.toString().includes(mentorId.toString())
            );
            res.status(200).json({
                success: true,
                menteeCourse: x,
            });
        } else {
            res.status(200).json({
                success: true,
                menteeCourse,
            });
        }
    } catch (error) {
        console.log(error);
    }
};
/////////////////
export const updateInfoGenerateCodeService = async (
    email: string,
    res: Response,
    next: NextFunction
) => {
    const mentee: any = await menteeModel.findOne({ email });
    if (!mentee) {
        return next(new ErrorHandler("Không tìm thấy email!", 400));
    }
    const isUpdate = mentee.isUpdate;
    if (isUpdate) {
        return next(new ErrorHandler("Thông tin của bạn đã được cập nhật!", 400));
    }
    try {
        const token = crypto.randomBytes(32).toString("hex");
        mentee.updateInfoToken = crypto
            .createHash("SHA256")
            .update(token)
            .digest("hex");
        mentee.updateInfoExpires = Date.now() + 120 * 60 * 1000;
        await mentee.save();
        const resetURL = `http://localhost:3000/cap-nhat-thong-tin/${token}`;
        const data = { user: { name: mentee.name }, resetURL };
        try {
            await sendMail({
                email: email,
                subject: "Cập nhật thông tin học viên",
                template: "update-info-mentee.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email:${email} to activate your account`,
                token,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    } catch (err) {
        if (err) return next(new ErrorHandler(err.message, 400));
    }
};

export const getInfoByMenteeService = async (
    token,
    res: Response,
    next: NextFunction
) => {
    try {
        const hashToken = crypto.createHash("SHA256").update(token).digest("hex");
        const mentee = await menteeModel
            .findOne({
                updateInfoToken: hashToken,
                updateInfoExpires: { $gt: Date.now() },
            })
            .populate("courses");
        if (!mentee) {
            return next(
                new ErrorHandler("token expired, please try again later", 400)
            );
        }
        res.status(200).json({
            success: true,
            mentee,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateInfoByMenteeService = async (
    body,
    token,
    res: Response,
    next: NextFunction
) => {
    try {
        const hashToken = crypto.createHash("SHA256").update(token).digest("hex");
        const mentee = await menteeModel.findOne({
            updateInfoToken: hashToken,
            updateInfoExpires: { $gt: Date.now() },
        });

        if (!mentee) {
            return next(
                new ErrorHandler("token expired, please try again later", 400)
            );
        } else {
            await menteeModel.findOneAndUpdate(
                {
                    email: mentee.email,
                },
                {
                    ...body,
                },
                {
                    new: true,
                }
            );
            (mentee.updateInfoToken = undefined),
                (mentee.updateInfoExpires = undefined),
                (mentee.isUpdate = true),
                mentee.save();
        }
        const menteeName = mentee?.name;
        const course: any = await menteeCourseModel
            .find({
                mentee: mentee._id,
            })
            .populate("course");

        if (!course) {
            return next(new ErrorHandler("Not found course!", 400));
        }
        const courseName = `${course[0].course.courseName} ${course[0].course.course} `;
        const courseMentor = course[0].course.mentor;
        await notificationModel.create({
            title: `Lớp ${courseName}`,
            by: mentee._id,
            user: courseMentor,
            message: `Học viên ${menteeName} đã cập nhật thông tin.`,
        });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateAvatarMenteeService = async (
    menteeId,
    avatar,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentee = await menteeModel.findById({ _id: menteeId });
        if (avatar && mentee) {
            if (mentee?.avatar.public_id) {
                await cloudinary.v2.uploader.destroy(mentee?.avatar.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 300,
                });
                mentee.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            } else {
                const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 300,
                });
                mentee.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }

        await mentee?.save();
        // await redis.set(userId,JSON.stringify(user));
        res.status(200).json({
            success: true,
            mentee,
        });
    } catch (error) {
        console.log(error);
    }
};

export const analyticsCriterionStrengthsMenteeService = async (
    menteeId: string,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentee = await menteeModel.find({ _id: menteeId });
        if (!mentee) {
            return next(new ErrorHandler("Not found mentee", 400));
        }

        const evaluations = await evaluationModel
            .find({ mentee: menteeId })
            .sort({ createdAt: "asc" });

        const c = [
            "research",
            "understandTA",
            "psychologicalBehavioral",
            "strategy",
            "plan",
            "content",
            "visualThinking",
            "investmentLevel",
            "deadline",
            "design",
            "idea",
            "proposalThinking",
            "dataAnalysis",
            "logic",
        ];

        const data = c.map((name: any) => {
            let score = [];
            let title = "";
            evaluations.forEach((item: any) => {
                title = item?.score?.[name].title;
                const x = Number(item?.score?.[name].value);
                score.push(x);
            });
            return {
                [name]: {
                    title,
                    score,
                },
            };
        });

        const projectName = evaluations.map((item) => item.projectTitle)
        const averageScore = evaluations.map((item) => Number(item.averageScore.value))

        res.status(200).json({
            success: true,
            averageAllCriterionScore: data,
            projectName,
            averageScore
        });
    } catch (error) {
        console.log(error);
    }
};

export const analyticsAverageScoreEachProjectService = async (
    menteeId: string,
    res: Response,
    next: NextFunction
) => {
    try {
        const mentee = await menteeCourseModel
            .find({ mentee: menteeId })
            .populate({ path: "course", select: ["code"] })
            .populate({
                path: "evaluations",
                select: ["projectTitle", "averageScore"],
            });
        if (!mentee) {
            return next(new ErrorHandler("Not found mentee", 400));
        }

        const newMenteeCourse = mentee.map((item: any) => {
            const evaluations = item.evaluations.map((evaluation) => {
                return {
                    title: evaluation.projectTitle,
                    value: evaluation.averageScore.value * 2,
                };
            });
            const data = {
                course: item.course?.code,
                evaluations,
            };
            return data;
        });

        res.status(200).json({
            success: true,
            courses: newMenteeCourse,
        });
    } catch (error) {
        console.log(error);
    }
};
/////////////////////////
export const getInfoCourseByMenteeGenerateCodeService = async (
    email: string,
    res: Response,
    next: NextFunction
) => {
    const mentee: any = await menteeModel.findOne({ email });
    if (!mentee) {
        return next(new ErrorHandler("Không tìm thấy email!", 400));
    }
    try {
        const token = crypto.randomBytes(32).toString("hex");
        mentee.updateInfoToken = crypto
            .createHash("SHA256")
            .update(token)
            .digest("hex");
        mentee.updateInfoExpires = Date.now() + 30 * 60 * 1000;
        await mentee.save();
        const resetURL = `http://localhost:3000/tra-cuu/${token}`;
        const data = { user: { name: mentee.name }, resetURL };
        try {
            await sendMail({
                email: email,
                subject: "Tra cứu đánh giá học viên",
                template: "update-info-mentee.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email:${email} to activate your account`,
                token,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    } catch (err) {
        if (err) return next(new ErrorHandler(err.message, 400));
    }
};

export const getEvaluationByMenteeService = async (
    token,
    res: Response,
    next: NextFunction
) => {
    try {
        const hashToken = crypto.createHash("SHA256").update(token).digest("hex");
        const mentee = await menteeModel
            .findOne({
                updateInfoToken: hashToken,
                updateInfoExpires: { $gt: Date.now() },
            })
            .populate("courses");
        if (!mentee) {
            return next(
                new ErrorHandler("token expired, please try again later", 400)
            );
        }

        let menteeCourse = await menteeCourseModel
            .find({
                mentee: mentee._id,
            })
            .populate([
                { path: "course", select: ["courseName", "course", "code", "mentor"] },
                { path: "evaluations" },
            ])
            .select("-mentee");

        res.status(200).json({
            success: true,
            mentee,
            menteeCourse,
        });
    } catch (error) {
        console.log(error);
    }
};
