import { prisma } from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import moment from "moment";

const BigCalendarContainer = async ({
    type,
    id
}: {
    type:"teacherId" | "classId"; 
    id: string | number;
}) => {

    const dataRes = await prisma.lesson.findMany ({
        where: {
            ...(type === "teacherId"
                ? {teacherId: id as string} 
                : {classId: id as number}),
        }
    })

    const data = dataRes.map(lesson => {
        const startUTC = new Date(lesson.startTime);
        const endUTC = new Date(lesson.endTime);

        // Create local date using UTC parts
        const start = new Date(
            startUTC.getUTCFullYear(),
            startUTC.getUTCMonth(),
            startUTC.getUTCDate(),
            startUTC.getUTCHours(),
            startUTC.getUTCMinutes(),
            startUTC.getUTCSeconds()
        );
        const end = new Date(
            endUTC.getUTCFullYear(),
            endUTC.getUTCMonth(),
            endUTC.getUTCDate(),
            endUTC.getUTCHours(),
            endUTC.getUTCMinutes(),
            endUTC.getUTCSeconds()
        );

        return {
            title: lesson.name,
            start,
            end,
        };
    });

    const schedule = adjustScheduleToCurrentWeek(data); 
    
    return <div className="h-full bg-white p-4 rounded-md">
            <BigCalendar data = {schedule}/>
        </div>;
}

export default BigCalendarContainer;