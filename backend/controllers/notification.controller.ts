import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../utils/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import notificationModel from "../models/notification.model";

export const getNotifications = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user._id
        const role = req.user.role
        try {
            let notifications 
            let count = 0;
            if(role.includes("mentor")){
                notifications = await notificationModel.find({
                    user:userId
                }).populate({path:"by",select:["avatar"]}).sort("-createdAt");
            }
            if(role.includes("admin")){
                notifications = await notificationModel.find().populate({path:"by",select:["avatar"]}).sort("-createdAt");
            }
            notifications.forEach((item)=>{
                if(item.status.includes("unread")) {
                    count = count + 1;
                }
            })
            res.status(201).json({
                success: true,
                countUnread:count,
                notifications
            })

        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateNotifications = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req?.params.id
            const nofification = await notificationModel.findById(id);

            if (!nofification) {
                return next(new ErrorHandler("Notification not found!", 404))
            } else {
                nofification.status ? nofification.status = "read" : nofification.status;
            }

            await nofification.save();

            res.status(201).json({
                success: true,
                nofification
            })
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
