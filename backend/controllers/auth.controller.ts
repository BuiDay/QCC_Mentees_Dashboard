import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../utils/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { forgotPasswordService, loginUserService, refreshTokenSevice, resetPasswordService } from "../services/auth.service";
import { ILoginRequest } from "./interface.controller";



export const forgotPassword = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body
            if (!email) {
                throw new Error("Vui lòng điền Email!")
            }
            forgotPasswordService(req, res, next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
)

export const resetPassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, token } = req.body;
        if (!password) {
            throw new Error("Vui lòng điền mật khẩu!")
        }
        resetPasswordService(password,token, res, next)
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 400));
    }
})


export const loginUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body as ILoginRequest;
            if (!email || !password) {
                return next(new ErrorHandler("Vui lòng điền email và mật khẩu", 400));
            }
            loginUserService(email,password,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateAccessToken = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try { 
            refreshTokenSevice(req,res,next)
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message, 400));
        }
    }
);
