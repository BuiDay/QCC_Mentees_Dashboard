import mongoose, { Model, Schema, Document } from "mongoose";

interface ICriteria {
    title: string,
    value: string
}

export interface IEvaluation extends Document {
    _id: Object,
    commentBy: Object;
    mentee: Object;
    comment: string;
    linkProject: string;
    subLinkProject: string[];
    projectTitle: string,
    projectDescription: string,
    submission:Object,
    score: {
        research: ICriteria, // điểm research
        understandTA: ICriteria // hiểu TA
        psychologicalBehavioral: ICriteria // tâm lí hành vi
        strategy: ICriteria // phát triển chiến lược
        plan: ICriteria // phát triển ké hoạch
        content: ICriteria // kỹ năng content
        visualThinking: ICriteria // tư duy hình ảnh
        investmentLevel: ICriteria // mức độ đầu tư
        deadline: ICriteria // đúng hạn
        design: ICriteria // thiết kế
        idea: ICriteria // ý tưởng
        proposalThinking: ICriteria // tư duy proposal
        dataAnalysis: ICriteria // phân tích dữ liệu
        logic: ICriteria // logic
    }
    averageScore: ICriteria // điểm số trung bình
}

const evaluationSchema: Schema<IEvaluation> = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentee"
    },
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
    },
    comment: {
        type: String,
    },
    linkProject: {
        type: String,
    },
    subLinkProject: [{
        type: String,
    }
    ],
    projectDescription: {
        type: String
    },
    projectTitle: {
        type: String
    },
    score: {
        research: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // điểm research
        understandTA: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // hiểu TA
        psychologicalBehavioral: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // tâm lí hành vi
        strategy: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        },// phát triển chiến lược
        plan: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // phát triển ké hoạch
        content: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // kỹ năng content
        visualThinking: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // tư duy hình ảnh
        investmentLevel: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // mức độ đầu tư
        deadline: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // đúng hạn
        design: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // thiết kế
        idea: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // ý tưởng
        proposalThinking: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // tư duy proposal
        dataAnalysis: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        }, // phân tích dữ liệu
        logic: {
            title: {
                type: String
            },
            value: {
                type: String
            }
        } // logic
    },
    averageScore: {
        title: {
            type: String
        },
        value: {
            type: String
        }
    } // điểm số trung bình
}, {
    timestamps: true
})

const evaluationModel: Model<IEvaluation> = mongoose.model("Evaluation", evaluationSchema);

export default evaluationModel;