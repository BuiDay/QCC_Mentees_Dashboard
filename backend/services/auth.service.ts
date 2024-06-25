import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../utils/catchAsyncErrors";
import menteeModel from "../models/mentee.model";
import ErrorHandler from "../utils/errorHandler";
import sendMail from "../utils/sendMail";
import crypto from "crypto"
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// quên mật khẩu
export const forgotPasswordService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const user = await menteeModel.findOne({ email });
        if (!user) {
            throw new Error("Không tìm thấy Email!")
        }
        const token = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = crypto.createHash("SHA256").update(token).digest("hex")
        user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
        await user.save();
        const resetURL = `${process.env.ORIGIN}/reset-password?token=${token}`
        const data = {
            resetURL,
            name: user.name
        }
        try {
            await sendMail({
                email: user.email,
                subject: "Quên mật khẩu",
                template: "forgot-password.ejs",
                data,
            });
            res.status(201).json({
                success: true,
                message: `Vui lòng kiểm tra: ${email} để thay đổi password`,
                token
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    } catch (err) {
        if (err)
            throw new Error(err.toString())
    }
}

//reset lại mật khẩu 
export const resetPasswordService = async (password: string, token: string, res: Response, next: NextFunction) => {
    try {
        const hashToken = crypto.createHash("SHA256").update(token).digest("hex");
        const user = await menteeModel.findOne({
            passwordResetToken: hashToken,
            passwordResetExpires: { $gt: Date.now() }
        })
        if (!user) {
            return next(new ErrorHandler("Đã hết hạn, vui lòng thử lại!", 400));
        }
        if (password) {
            user.password = password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            user.save()
        }
        res.status(201).json({
            success: true,
        });
    } catch (err) {
        if (err)
            throw new Error(err.toString())
    }
}

//đăng nhập 

export const loginUserService = async (email: string, password: string, res: Response, next: NextFunction) => {
    try {
        const userPassword = await menteeModel.findOne({ email }).select("+password");
        if (!userPassword) {
            return next(new ErrorHandler("Không tìm thấy tài khoản!", 400));
        }
        const isPasswordMatch = await userPassword.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Mật khẩu không đúng!", 400));
        }
        const user = await menteeModel.findOne({ email });
        sendToken(user, 200, res);
    } catch (err) {
        if (err)
            throw new Error(err.toString())
    }
}

export const refreshTokenSevice = async (req, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token as string;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN) as JwtPayload;
        const message = 'Could not refresh token';
        if (!decoded) {
            return next(new ErrorHandler(message, 400));
        }

        const user = await menteeModel.findById(decoded.id)

        const accessToken = jwt.sign({ id: user?.id }, process.env.ACCESS_TOKEN, { expiresIn: "5m" });
        const refreshToken = jwt.sign({ id: user?.id }, process.env.REFRESH_TOKEN, { expiresIn: "3d" });

        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        res.status(200).json({
            success: true,
            accessToken
        })
    } catch (error) {

    }
}