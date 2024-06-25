import mongoose, { Model, Schema,Document} from "mongoose";

export interface INotification extends Document{
    title:string;
    message:string;
    status:string;
    user:string;
    by:Object;
    course:Object;
}

const notificationSchema:Schema<INotification> = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'     
    },
    user:{
        type:String,
    },
    message:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"unread"
    }
},{
    timestamps:true
})

const notificationModel: Model<INotification> = mongoose.model("notification",notificationSchema);

export default notificationModel;