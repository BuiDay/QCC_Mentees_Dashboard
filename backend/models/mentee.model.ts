import mongoose, { Model, Schema, Document } from "mongoose";
require('dotenv').config();

const emailRegexPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface IMentee extends Document {
    _id: Object,
    menteeId: string,
    name: string,
    email: string,
    password:string;
    comparePassword:(password:string) => Promise<boolean>;
    SignAccessToken:()=>string;
    SignRefreshToken:()=>string;
    gender: string,
    address: {
        distric: string,
        province: string
    },
    avatar:{
        public_id:string,
        url:string,
    },
    yearOfBirth: number,
    jobOrientation: string,
    skills: string,
    phone: string,
    courses: Array<{
        _id: Object,
        name: string
    }>
    universityName: string,
    engLevel: string,
    level: string,
    linkPortfolio: string,
    companyNumber: string,
    jobNumber: number,
    updateInfoToken: string,
    updateInfoExpires: any,
    isUpdate: boolean
}

const menteeSchema: Schema<IMentee> = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value: string) {
                return emailRegexPattern.test(value)
            },
            message: "please enter a valid email",
        },
        unique: true
    },
    menteeId: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
    },
    yearOfBirth: {
        type: Number,
    },
    address: {
        distric: {
            type: String,
        },
        province: {
            type: String,
        }
    },
    avatar:{
        public_id:String,
        url:String,
    },
    phone: {
        type: String,
    },
    jobOrientation: {
        type: String,
    },
    skills: {
        type: String,
    },
    courses: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
            },
            name:{
                type:String
            }
        }
    ],
    universityName: {
        type: String,
    },
    engLevel: {
        type: String,
    },
    level: {
        type: String,
        default: "Newbie",
    },
    linkPortfolio: {
        type: String,
        default: null
    },
    companyNumber: {
        type: String,
    },
    jobNumber: {
        type: Number,
        default: 0
    },
    isUpdate: {
        type: Boolean,
        default: false
    },
    updateInfoToken: String,
    updateInfoExpires: Date
}, { timestamps: true });


const menteeModel: Model<IMentee> = mongoose.model("Mentee", menteeSchema);

export default menteeModel;