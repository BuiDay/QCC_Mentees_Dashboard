import _ from 'lodash'
import rewardModel from '../models/reward.model';


export const findTopStudentByInsight = async (getAllMenteesOfCourse) => {
    let newArrayMenteeOfCourse = []

    for (const student of getAllMenteesOfCourse) {
        const scoreUnderstandTA = student.evaluations.map(item => item.score.understandTA ? Number(item.score?.understandTA.value) : 0)
        const totalScoreUnderstandTA = scoreUnderstandTA.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const averageScoreUnderstandTA = totalScoreUnderstandTA / scoreUnderstandTA.length || 0

        const scorePsychologicalBehavioral = student.evaluations.map(item => item.score.psychologicalBehavioral ? Number(item.score?.psychologicalBehavioral.value) : 0)
        const totalPsychologicalBehavioral = scorePsychologicalBehavioral.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const averagePsychologicalBehavioral = totalPsychologicalBehavioral / scorePsychologicalBehavioral.length || 0

        const averageInsight = (averageScoreUnderstandTA + averagePsychologicalBehavioral) / 2

        const averageScore = student.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = totalAverageScore / averageScore.length || 0

        const data = {
            course: student.course,
            mentee: student.mentee,
            averageInsight,
            overallAverageScore
        }
        newArrayMenteeOfCourse.push(data)
    }

    let sorted_MenteeOfCourse = _.sortBy(newArrayMenteeOfCourse, ['averageInsight', "overallAverageScore"]).reverse();

    const final = sorted_MenteeOfCourse.map((item, index) => { return { ...item, ranking: index + 1 } })

    return final
}


export const findTopStudentByDesign = async (getAllMenteesOfCourse) => {
    let newArrayMenteeOfCourse = []

    for (const student of getAllMenteesOfCourse) {
        const scoreDesign = student.evaluations.map(item => item.score.design.value ? Number(item.score.design.value) : 0)
        const totalScoreDesign = scoreDesign.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);

        const averageScoreDesign = totalScoreDesign / scoreDesign.length || 0

        const averageScore = student.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = totalAverageScore / averageScore.length || 0

        const data = {
            course: student.course,
            mentee: student.mentee,
            averageScoreDesign,
            overallAverageScore
        }
        newArrayMenteeOfCourse.push(data)
    }

    let sorted_MenteeOfCourse = _.sortBy(newArrayMenteeOfCourse, ['averageScoreDesign', "overallAverageScore"]).reverse();

    const final = sorted_MenteeOfCourse.map((item, index) => { return { ...item, ranking: index + 1 } })

    return final
}


export const findTopStudentByIdea = async (getAllMenteesOfCourse) => {
    let newArrayMenteeOfCourse = []

    for (const student of getAllMenteesOfCourse) {
        const scoreIdea = student.evaluations.map(item => item.score.idea.value ? Number(item.score.idea.value) : 0)
        const totalScoreIdea = scoreIdea.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);

        const averageScoreIdea = totalScoreIdea / scoreIdea.length || 0

        const averageScore = student.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = totalAverageScore / averageScore.length || 0

        const data = {
            course: student.course,
            mentee: student.mentee,
            averageScoreIdea,
            overallAverageScore
        }
        newArrayMenteeOfCourse.push(data)
    }

    let sorted_MenteeOfCourse = _.sortBy(newArrayMenteeOfCourse, ['averageScoreIdea', "overallAverageScore"]).reverse();

    const final = sorted_MenteeOfCourse.map((item, index) => { return { ...item, ranking: index + 1 } })

    return final
}

// phân loại top của tiêu chí Research
export const findTopStudentByResearch = async (getAllMenteesOfCourse) => {
    let newArrayMenteeOfCourse = []

    for (const student of getAllMenteesOfCourse) {
        const scoreResearch = student.evaluations.map(item => item.score.research.value ? Number(item.score.research.value) : 0)
        const totalScoreResearch = scoreResearch.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);

        const averageScoreOfResearch = totalScoreResearch / scoreResearch.length || 0

        const averageScore = student.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = totalAverageScore / averageScore.length || 0

        const data = {
            course: student.course,
            mentee: student.mentee,
            averageScoreOfResearch,
            overallAverageScore,
            ranking: 0
        }
        newArrayMenteeOfCourse.push(data)
    }

    let sorted_MenteeOfCourse = _.sortBy(newArrayMenteeOfCourse, ['averageScoreResearch', "overallAverageScore"]).reverse();

    // const final = sorted_MenteeOfCourse.map((item, index) => { return { ...item, ranking: index + 1 } })
    let rank = 1;

    for (let i = 0; i < sorted_MenteeOfCourse.length; i++) {
        if (i > 0 && sorted_MenteeOfCourse[i].overallAverageScore === sorted_MenteeOfCourse[i - 1].overallAverageScore && sorted_MenteeOfCourse[i].averageScoreOfProposal === sorted_MenteeOfCourse[i - 1].averageScoreOfProposal) {
            sorted_MenteeOfCourse[i].ranking = sorted_MenteeOfCourse[i - 1].ranking;
        } else {
            sorted_MenteeOfCourse[i].ranking = rank;
        }
        rank++;
    }
    return sorted_MenteeOfCourse
}

// phân loại top của tiêu chí Proposal
export const findTopStudentByProposal = async (getAllMenteesOfCourse) => {
    let newArrayMenteeOfCourse = []

    for (const student of getAllMenteesOfCourse) {

        const scoreProposal = student.evaluations.map(item => item.score?.proposalThinking?.value ? Number(item.score.proposalThinking.value) : 0)
        const totalScoreProposal = scoreProposal.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const averageScoreOfProposal = totalScoreProposal / scoreProposal.length || 0

        const averageScore = student.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = totalAverageScore / averageScore.length || 0

        const data = {
            course: student.course,
            mentee: student.mentee,
            averageScoreOfProposal,
            overallAverageScore,
            ranking: 0
        }
        newArrayMenteeOfCourse.push(data)
    }

    let sorted_MenteeOfCourse = _.sortBy(newArrayMenteeOfCourse, ['averageScoreOfProposal', "overallAverageScore"]).reverse();

    let rank = 1;

    for (let i = 0; i < sorted_MenteeOfCourse.length; i++) {
        if (i > 0 && sorted_MenteeOfCourse[i].overallAverageScore === sorted_MenteeOfCourse[i - 1].overallAverageScore && sorted_MenteeOfCourse[i].averageScoreOfProposal === sorted_MenteeOfCourse[i - 1].averageScoreOfProposal) {
            sorted_MenteeOfCourse[i].ranking = sorted_MenteeOfCourse[i - 1].ranking;
        } else {
            sorted_MenteeOfCourse[i].ranking = rank;
        }
        rank++;
    }

    return sorted_MenteeOfCourse
}

export const sortMenteeByScore = async (mentees) => {
    let newArrayMenteeOfCourse = []

    for (const student of mentees) {

        const averageScore = student.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = Number((totalAverageScore / averageScore.length || 0).toFixed(3))

        const data = {
            course: student.course,
            mentee: student.mentee,
            overallAverageScore,
            ranking: 0
        }
        newArrayMenteeOfCourse.push(data)
    }

    let sorted_MenteeOfCourse = _.sortBy(newArrayMenteeOfCourse, ["overallAverageScore"]).reverse();
    let rank = 1;

    for (let i = 0; i < sorted_MenteeOfCourse.length; i++) {
        if (i > 0 && sorted_MenteeOfCourse[i].overallAverageScore === sorted_MenteeOfCourse[i - 1].overallAverageScore) {
            sorted_MenteeOfCourse[i].ranking = sorted_MenteeOfCourse[i - 1].ranking;
        } else {
            sorted_MenteeOfCourse[i].ranking = rank;
        }
        rank++;
    }
    
    return sorted_MenteeOfCourse
}

export const bestStudent = async (mentees) => {
    let arrObjectScoreMenteeArr = []
    /// tính điểm trung bình trong tất cả các project
    for (const mentee of mentees) {
        // tính điểm trung bình từng kĩ năng
        const averageScoreProposal = await calculatorAverageScoreEachSkill(mentee,"proposalThinking")
        const averageScoreDesign = await calculatorAverageScoreEachSkill(mentee,"design")
        const averageScoreResearch = await calculatorAverageScoreEachSkill(mentee,"research")
        const averageScoreUnderstandTA = await calculatorAverageScoreEachSkill(mentee,"understandTA")
        const averageScorePsychologicalBehavioral = await calculatorAverageScoreEachSkill(mentee,"psychologicalBehavioral")
        const averageScoreStrategy = await calculatorAverageScoreEachSkill(mentee,"strategy")
        const averageScorePlan = await calculatorAverageScoreEachSkill(mentee,"plan")
        const averageScoreContent = await calculatorAverageScoreEachSkill(mentee,"content")
        const averageScoreVisualThinking = await calculatorAverageScoreEachSkill(mentee,"visualThinking")
        const averageScoreInvestmentLevel = await calculatorAverageScoreEachSkill(mentee,"investmentLevel")
        const averageScoreDeadline = await calculatorAverageScoreEachSkill(mentee,"deadline")
        const averageScoreIdea = await calculatorAverageScoreEachSkill(mentee,"idea")
        const averageScoreDataAnalysis = await calculatorAverageScoreEachSkill(mentee,"dataAnalysis")
        const averageScoreLogic = await calculatorAverageScoreEachSkill(mentee,"logic")
    
        const averageScore = mentee.evaluations.map(item => item.averageScore ? Number(item?.averageScore.value) : 0)
        const totalAverageScore = averageScore.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
        const overallAverageScore = totalAverageScore / averageScore.length || 0

        if(overallAverageScore >= 3 && averageScoreResearch >= 3 
            && averageScoreDesign >=3 && averageScoreUnderstandTA >= 3 
            && averageScorePsychologicalBehavioral >= 3 && averageScoreStrategy >=3 
            && averageScorePlan >= 3 && averageScoreContent >= 3 && averageScoreVisualThinking >=3 
            && averageScoreInvestmentLevel >= 3 && averageScoreDeadline >=3
            && averageScoreIdea >= 3  && averageScoreLogic >= 3 ){
            const temp = {
                course: mentee.course,
                mentee: mentee.mentee,
                averageScoreAllProject: Number((overallAverageScore).toFixed(2) || 0),
                averageScoreDesign,
                averageScoreResearch,
                averageScoreUnderstandTA,
                averageScorePsychologicalBehavioral,
                averageScoreStrategy,
                averageScorePlan,
                averageScoreContent,
                averageScoreVisualThinking,
                averageScoreInvestmentLevel,
                averageScoreDeadline,
                averageScoreIdea,
                averageScoreDataAnalysis,
                averageScoreLogic
            }
            arrObjectScoreMenteeArr.push(temp)
        }
    }

    // let sorted_arrObjectScoreMenteeArr = _.sortBy("").reverse();

    return arrObjectScoreMenteeArr
}

export const findTopStudent = async (mentees, code, from, to) => {
    // const getReward = await rewardModel.findOne({ code: code })
    if (from === to) {
        mentees = mentees.filter((item) => item.ranking === from)
        // const data = {
        //     // reward: getReward?._id,
        //     mentees: mentees.mentee._id,
        //     date: new Date,
        //     // times: getReward.amount + 1
        // }
        return mentees
    } else {
        mentees = mentees.filter((item) => item.ranking >= from && item.ranking <= to)
        return (mentees)
    }

}

// hàm tính điểm trung bình từng kĩ năng
export const calculatorAverageScoreEachSkill = async (mentee,skill) => {
    const score = mentee.evaluations.map(item => item.score?.[skill].value ? Number(item.score?.[skill].value) : 0)
    const totalScore = score.reduce((accumulator: number, current: number) => accumulator = accumulator + current, 0);
    const averageScore = totalScore / score.length || 0
    return averageScore
}
