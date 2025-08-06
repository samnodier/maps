"use client"

import { deleteSubject, deleteClass, deleteTeacher } from "@/lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
    teacher: deleteTeacher,
    student: deleteSubject,
    parent: deleteSubject,
    subject: deleteSubject,
    class: deleteClass,
    lesson: deleteSubject,
    exam: deleteSubject,
    assignment: deleteSubject,
    result: deleteSubject,
    attendance: deleteSubject,
    event: deleteSubject,
    announcement: deleteSubject
}

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

const forms: {
    [key: string]: (
        setOpen: Dispatch<SetStateAction<boolean>>,
        type: "create" | "update",
        data?: any,
        relatedData?: any
    ) => JSX.Element;
} = {
    teacher: (setOpen, type, data, relatedData) => <TeacherForm setOpen={setOpen} type={type} data={data} relatedData = {relatedData} />,
    student: (setOpen, type, data, relatedData) => <StudentForm setOpen={setOpen} type={type} data={data} relatedData = {relatedData} />,
    parent: (setOpen, type, data) => <ParentForm setOpen={setOpen} type={type} data={data} />,
    subject: (setOpen, type, data, relatedData) => <SubjectForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
    class: (setOpen, type, data, relatedData) => <ClassForm setOpen={setOpen} type={type} data={data} relatedData={relatedData} />,
    lesson: (setOpen, type, data) => <LessonForm setOpen={setOpen} type={type} data={data} />,
    exam: (setOpen, type, data) => <ExamForm setOpen={setOpen} type={type} data={data} />,
    assignment: (setOpen, type, data) => <AssignmentForm setOpen={setOpen} type={type} data={data} />,
    result: (setOpen, type, data) => <ResultForm setOpen={setOpen} type={type} data={data} />,
    attendance: (setOpen, type, data) => <AttendanceForm setOpen={setOpen} type={type} data={data} />,
    event: (setOpen, type, data) => <EventForm setOpen={setOpen} type={type} data={data} />,
    announcement: (setOpen, type, data) => <AnnouncementForm setOpen={setOpen} type={type} data={data} />,
}

const FormModal = ({ table, type, data, id, relatedData }: FormContainerProps & { relatedData?: any }) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-mapYellow" : type === "update" ? "bg-mapSky" : "bg-mapPurple";
    const [open, setOpen] = useState<boolean>(false);

    const Form = () => {

        const [state, formAction] = useFormState(deleteActionMap[table], {
            success: false,
            error: false
        });


        const router = useRouter();

        useEffect(() => {
            if (state.success) {
                toast(`Subject has been deleted successfully!`, {
                    type: "success",
                });
                setOpen(false);
                router.refresh();
            }
        }, [state.success]);

        return type === "delete" && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4">
                <input type="text | number" name="id" value={id} hidden />
                <span className="text-center font-medium">All data will be lost. Are you sure you want to delete this item {table}?</span>
                <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
            </form>
        ) : type === "create" || type === "update" ? (forms[table](setOpen, type, data, relatedData)) : "Form not found";
    }
    return (
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