import mongoose, { Model, Schema, Document } from "mongoose";

export interface IRewardOfMentee extends Document {
    reward: Object,
    mentees: {
        mentee:Object,
        course:Object
    }[],
    date: Date,
    times:number
}

const rewardOfMenteeSchema: Schema<IRewardOfMentee> = new mongoose.Schema({
    reward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reward"
    },
    date: {
        type: Date
    },
    times:{
        type: Number
    },
    mentees: [{
        mentee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentee"
        },
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    }]
}, {
    timestamps: true
})

const rewardOfMenteeModel: Model<IRewardOfMentee> = mongoose.model("RewardOfMentee", rewardOfMenteeSchema);

export default rewardOfMenteeModel;