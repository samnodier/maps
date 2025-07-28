"use client"
import dynamic from "next/dynamic";
import Image from "next/image";
import {useState} from "react";
// import TeacherForm from "@/components/forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("@/components/forms/TeacherForm"));
const StudentForm = dynamic(() => import("@/components/forms/StudentForm"));
const ParentForm = dynamic(() => import("@/components/forms/ParentForm"));
const SubjectForm = dynamic(() => import("@/components/forms/SubjectForm"));
const ClassForm = dynamic(() => import("@/components/forms/ClassForm"));
const LessonForm = dynamic(() => import("@/components/forms/LessonForm"));
const ExamForm = dynamic(() => import("@/components/forms/ExamForm"));
const AssignmentForm = dynamic(() => import("@/components/forms/AssignmentForm"));
const ResultForm = dynamic(() => import("@/components/forms/ResultForm"));
const AttendanceForm = dynamic(() => import("@/components/forms/AttendanceForm"));
const EventForm = dynamic(() => import("@/components/forms/EventForm"));
const AnnouncementForm = dynamic(() => import("@/components/forms/AnnouncementForm"));

const forms : {[key: string]: (type: "create" | "update", data?: any) => JSX.Element;} = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
    parent: (type, data) => <ParentForm type={type} data={data} />,
    subject: (type, data) => <SubjectForm type={type} data={data} />,
    class: (type, data) => <ClassForm type={type} data={data} />,
    lesson: (type, data) => <LessonForm type={type} data={data} />,
    exam: (type, data) => <ExamForm type={type} data={data} />,
    assignment: (type, data) => <AssignmentForm type={type} data={data} />,
    result: (type, data) => <ResultForm type={type} data={data} />,
    attendance: (type, data) => <AttendanceForm type={type} data={data} />,
    event: (type, data) => <EventForm type={type} data={data} />,
    announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
}

const FormModal = ({table, type, data, id}:{
    table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-mapYellow" : type=== "update" ? "bg-mapSky" : "bg-mapPurple";
    const [open, setOpen] = useState(false);

    const Form = () => {
        return type === "delete" && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this item {table}?</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
        </form>
        ) : type=== "create" || type === "update" ? (forms[table](type, data)) : "Form not found";
    }
    return(
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
            onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} alt="" width={16} height={16} />
            </button>
            {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                    <Form />
                <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                    <Image src="/close.png" alt="" width={14} height={14} />
                </div>
                </div>
            </div>}
        </>
    )
}

export default FormModal;