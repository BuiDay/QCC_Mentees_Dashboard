import { isTypeQueryNode } from "typescript";
import { IMentee } from "../models/mentee.model";
import { Response } from "express";

require('dotenv').config();

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean
}

export const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
export const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

//options for cookies
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
}

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000 * 1000,
    httpOnly: true,
    sameSite: 'lax'
}

export const sendToken = (user: IMentee, statusCode: number, res:Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    //parse enviroment variables to integrates with fallback values
 
    if(process.env.NODE_ENV === "production"){
        accessTokenOptions.secure = true
    }

    res.cookie("access_token", accessToken ,accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success:true,
        user,
        accessToken
    })
}