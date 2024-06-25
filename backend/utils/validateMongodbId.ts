import mongoose from "mongoose"
import ErrorHandler from "./errorHandler";
import { NextFunction } from "express";

const validateMongodbId =(id:string)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error("This ID is not valid or not Found");
    }
};

export = validateMongodbId;