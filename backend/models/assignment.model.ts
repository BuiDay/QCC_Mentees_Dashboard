import mongoose, { Model, Schema,Document} from "mongoose";

export interface IAssignment extends Document{
    course:Object;
    startDate: Date;
    projectName:string;
    endDate:Date;
    description:string
}

const assignmentSchema :Schema<IAssignment> = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    projectName:{
        type:String,
    },
    description:{
        type:String,
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    }
},{
    timestamps:true
})

const assignmentModel: Model<IAssignment> = mongoose.model("Assignment",assignmentSchema );

export default assignmentModel;