import mongoose, { Model, Schema, Document } from "mongoose";


export interface IMenteeCourse extends Document {
    course: Object, // courseId
    mentee:Object,
    generalComments: string, // đánh giá chung
    classification: string, // xếp hạng
    finalGrade: number, // điểm tổng kết
    //receptivityLevel: string, // mức độ tiếp thu
    //marketingThinking: string // tư duy marketing
    //logicThinking: string, // tư duy logic
    //presentationCapabilities: string, // khả năng thuyết trình
    //attitudeScore: string, // điểm thái độ
    evaluations: Array<{ evaluation: string }> // đánh giá từng project
}

const menteeCourseSchema: Schema<IMenteeCourse> = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }, // courseId
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee',
    }, // courseId
    generalComments: {
        type:String
    }, // đánh giá chung
    classification:  {
        type:String
    }, // xếp hạng
    finalGrade: {
       type:Number
    }, // điểm tổng quát
    //receptivityLevel:  {
    //    type:String
    //},// mức độ tiếp thu
    //marketingThinking:  {
    //    type:String
    //},// tư duy marketing
    //logicThinking:  {
    //    type:String
    //}, // tư duy logic
    //presentationCapabilities:  {
    //    type:String
    //}, // khả năng thuyết trình
    //attitudeScore:  {
    //    type:String
    //}, // điểm thái độ
    evaluations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Evaluation'
        }
    ]

}, { timestamps: true });

const menteeCourseModel: Model<IMenteeCourse> = mongoose.model("MenteeCourse", menteeCourseSchema);

export default menteeCourseModel;