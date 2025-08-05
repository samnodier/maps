import { auth } from "@clerk/nextjs/server";
import { start } from "repl";

export const getRole = async () => {
    const { sessionClaims } = await auth();
    return (sessionClaims?.metadata as {role?: string})?.role;
};

export const getCurrentUserId = async () => {
    const { userId } = await auth();
    return userId;
};

const currentWorkWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const startOfWeek = new Date(today);

    if(dayOfWeek === 0) {
        startOfWeek.setDate(today.getDate() +1); 
    }
    if(dayOfWeek === 6) {
        startOfWeek.setDate(today.getDate() +2); 
    } else {
        startOfWeek.setDate(today.getDate() - dayOfWeek - 1);
    }

    startOfWeek.setHours(0, 0, 0, 0);

    return {startOfWeek};
}

export const adjustScheduleToCurrentWeek = (
    lessons: {title:string; start:Date; end:Date}[]
):{title:string; start:Date; end:Date}[] => {
    const {startOfWeek} = currentWorkWeek();

    return lessons.map(lesson => {
        const lessonDayOfWeek = lesson.start.getDay();
        const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

        const adjustedStartDate = new Date (startOfWeek);
        adjustedStartDate.setDate(startOfWeek.getDate() + daysFromMonday);

        const adjustedEndDate = new Date(adjustedStartDate);
        adjustedStartDate.setHours(
            lesson.start.getHours(), 
            lesson.start.getMinutes(), 
            lesson.start.getSeconds(), 
        );

        adjustedEndDate.setHours(
            lesson.end.getHours(), 
            lesson.end.getMinutes(), 
            lesson.end.getSeconds(),
        ); 

        return {
            title: lesson.title, 
            start:adjustedStartDate,
            end: adjustedEndDate
        };
    });
}