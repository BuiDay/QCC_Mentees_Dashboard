import { CatchAsyncError } from "../utils/catchAsyncErrors";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { analyticsAgeAllMenyteesService, analyticsAverageScoreAllMenteesService, analyticsOverviewAmountMenteesService, analyticsProvinceAllMenteesService, analyticsRankMenteesService } from "../services/overview.service";


export const analyticsAgeAllMentees= CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsAgeAllMenyteesService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 

export const analyticsProvinceAllMentees= CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsProvinceAllMenteesService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 


export const analyticsRankMentees= CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsRankMenteesService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 


export const analyticsAverageScoreAllMentees= CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsAverageScoreAllMenteesService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 


export const analyticsOverviewAmountMentees= CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            analyticsOverviewAmountMenteesService(req,res,next);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
) 
