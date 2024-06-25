import { count } from "console";
import { Model, Document } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

interface DateData {
  date: string;
  count: number;
}

export const generateMenteeLastDateData = async <T extends Document>(
  model: Model<T>
): Promise<{ data: object }> => {
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  const lastDate: DateData[] = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = 5;
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  for (let i = 1; i < daysInCurrentMonth + 1; i++) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentMonth - 1,
      i, 
      23,
      59,
      59,
      999
    );
    const startDate = new Date(
      currentDate.getFullYear(),
      currentMonth - 1,
      i,
      0,
      0,
      0,
      0
    );
    const dateMonthYear = endDate.toLocaleString("vn", {
      day: "numeric",
      month: "short",
      // year: "numeric",
    });
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    lastDate.push({ date: dateMonthYear, count });
  }
  const data = {
    month: `${currentMonth}/${currentYear}`,
    day: lastDate,
  };
  return { data };
};

export const generateCourseLastDateData = async <T extends Document>(
  model: Model<T>
): Promise<{ data: object }> => {
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = 5;
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  const startDate = new Date(currentDate.getFullYear(), currentMonth - 1, 2);
  const endDate = new Date(
    currentDate.getFullYear(),
    currentMonth - 1,
    daysInCurrentMonth + 1
  );

  const allMenteeCourseInMonth = await model
    .find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    .populate("course");

  const arrTotalCode = [];
  allMenteeCourseInMonth.forEach((mentee: any) => { arrTotalCode.push(mentee.course.code)});

  const data = {
    month: `${currentMonth}/${currentYear}`,
    course:{
      totalSMS: {
        title:"Lớp SMS",
        value : arrTotalCode.filter((item) => item === "SMS").length
      },
      totalMC: {
        title:"Lớp MC",
        value:arrTotalCode.filter((item) => item === "MC").length,
      } ,
      totalCF:{
        title:"Lớp CF",
        value:arrTotalCode.filter((item) => item === "CF").length,
      } 
    }
  };
  
  return { data };
};
