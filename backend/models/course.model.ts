import mongoose, { Model, Schema,Document} from "mongoose";

export interface ICourse extends Document{
    courseName:string;
    code:string;
    course:string;
    mentor:Object;
    startTime:Date;
    endTime:Date;
    countMentee:number,
    projectIndex:number;
}

const courseSchema:Schema<ICourse> = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    code:{
        type:String,
    },
    projectIndex:{
        type:Number,
        default:0
    },
    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    countMentee:{
        type:Number,
        default: 0
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date,
    }
},{
    timestamps:true
})

const courseModel: Model<ICourse> = mongoose.model("Course",courseSchema);

export default courseModel;