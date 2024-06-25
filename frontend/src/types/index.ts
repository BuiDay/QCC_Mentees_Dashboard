
export interface IComment {
  commentBy?: Object
  mentee?: Object
  comment?: string
}

export interface IUser {
  _id?: string
  name?: string
  menteeId?: string
  email?: string
  address?: {
    distric: string,
    province: string
  }
  gender?: string
  phone?: string
  yearOfBirth: string
  jobOrientation: string
  skills: string
  courses: Array<ICourse>
  universityName?: string
  engLevel?: string
  level?: string
  linkPortfolio?: string
  linkProject?: string[]
  comment?: Array<IComment>
  companyNumber?: string
  jobNumber?: string
  attitudeScore?: number
  thinkingScore?: number
  updatedAt?: Date
  isUpdate: boolean,
  avatar?: {
    public_id: string,
    url: string,
  };
}

export interface IMentor {
  _id?: string
  name?: string
}

export interface ICourse {
  _id?: string
  name?: string
  code?: string,
  course?: string
  courseName?: string
  mentor?: IMentor
  startTime?: Date
  endTime?: Date
  countMentee?: number
}

export interface ICoursePayload {
  courseName?: string
  course?: string
  mentor?: string
  code?: string
  startTime?: Date
  endTime?: Date
}

export interface IProvinces {
  province_id?: string
  province_name?: string
}

export interface IDistrics {
  district_id?: string
  district_name?: string
}

export interface INotifications {
  title?: string
  user?: string
  message?: string
  status?: string
  by?:{avatar:{
    public_id:string,
    url:string
  }}
  createdAt?: string
}

// export interface IMenteeCourse {
//   _id?: string
//   mentee?: IMentee,
//   course?: ICourse,
//   evaluations?: IEvaluations[]
//   // generalComments?: string, // đánh giá chung
//   // classification?: string, // xếp hạng
//   finalGrade?: number, // điểm tổng quát
// }

export interface ICriteria {
  title: string,
  value: string
}

export interface ICriterionScore {
  title: string,
  ranges: number,
  measures: number,
  targets: number,
}


export interface IEvaluations {
  _id?: string
  commentBy?: Object;
  mentee?: Object;
  comment?: string;
  linkProject?: string;
  subLinkProject?:string[];
  projectTitle?: string,
  projectDescription?: string
  score?: {
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
    logic: ICriteria // logic// điểm số trung bình
  }
  averageScore: ICriteria
}

export interface IAverageAllCriterionScore {
  averageResearch?: ICriterionScore,
  averageUnderstandTA?: ICriterionScore,
  averagePsychologicalBehavioral?: ICriterionScore,
  averageStrategy?: ICriterionScore,
  averagePlan?:ICriterionScore
  averageContent?:ICriterionScore
  averageVisualThinking?:ICriterionScore
  averageInvestmentLevel?:ICriterionScore
  averageDeadline?:ICriterionScore
  averageDesign?:ICriterionScore
  averageIdea?:ICriterionScore
  averageProposalThinking?:ICriterionScore
  averageDataAnalysis?:ICriterionScore
  averageLogic?:ICriterionScore
}


export interface IOverviewAmountMentee {
  totalMentees?: number,
  totalMenteesCoures?: number,
  classifyCourse?:{
    SMS:number,
    CF:number,
    MC:number
  }
}


