import mongoose, { Model, Schema, Document } from "mongoose";
require('dotenv').config();
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
    passwordResetToken:string,
    passwordResetExpires:number,
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
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minlength:[6,"Password must be at least 6 characters"],
        select:false
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
    updateInfoExpires: Date,
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Number
    },
}, { timestamps: true });



//hasd password before saving
menteeSchema.pre<IMentee>("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

//sign access token
menteeSchema.methods.SignAccessToken = function(){
    return jwt.sign({id:this._id},process.env.ACCESS_TOKEN || "",{expiresIn:"4m"})
}

//sign refresh token
menteeSchema.methods.SignRefreshToken = function(){
    return jwt.sign({id:this._id},process.env.REFRESH_TOKEN || "",{expiresIn:"5d"})
}

//compare password
menteeSchema.methods.comparePassword = async function name(enterPassword:string):Promise<boolean> {
    return await bcrypt.compare(enterPassword, this.password)
}

const menteeModel: Model<IMentee> = mongoose.model("Mentee", menteeSchema);
export default menteeModel;