import mongoose, { Model, Schema, Document } from "mongoose";

export interface IReward extends Document {
    nameReward: string,
    amount:number,
    code:string,
    topNumber:number,
    icon:string
}

const rewardSchema: Schema<IReward> = new mongoose.Schema({
    nameReward: {
        type: "String"
    },
    code: {
        type: "String"
    },
    icon: {
        type: "String"
    },
    topNumber:{
        type:Number,
    },
    amount:{
        type:Number,
        default:0
    },
}, {
    timestamps: true
})

const rewardModel: Model<IReward> = mongoose.model("Reward", rewardSchema);

export default rewardModel;