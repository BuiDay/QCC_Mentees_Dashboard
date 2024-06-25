import mongoose, { Model, Schema,Document} from "mongoose";

export interface ISubmission extends Document{
    assignment:Object;
    mentee: Object;
    submissionDate:Date;
    fileUrl:string;
    status:string;
}

const submissionSchema :Schema<ISubmission> = new mongoose.Schema({
    assignment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentee"
    },
    submissionDate:{
        type:Date
    },
    status: {
        type: String,
        enum: ['submitted', 'not submitted','submitted later'],
        default: 'submitted'
    },
    fileUrl:{
        type:String
    }
},{
    timestamps:true
})

const submissionModel: Model<ISubmission> = mongoose.model("Submission",submissionSchema);

export default submissionModel;