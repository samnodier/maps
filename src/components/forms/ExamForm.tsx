"use client"

import { Resolver, useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { createExam, updateExam } from "@/lib/actions";
import { ExamSchema, examSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, use, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getCurrentUserId, getRole } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";

const ExamForm = ({
    type,
    data,
    relatedData,
    setOpen
}: {
    type: "create" | "update";
    data?: any
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ExamSchema>({
        resolver: zodResolver(examSchema) as unknown as Resolver<ExamSchema>,
    });

    const [state, formAction] = useFormState(type === "create" ? createExam : updateExam, { success: false, error: false });

    const onSubmit = handleSubmit(data => {
        console.log(data);
        formAction({ ...data });
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Exam has been ${type === "create" ? "created" : "updated"} successfully!`, {
                type: "success",
            });
            setOpen(false);
            router.refresh();
        }
    }, [state.success, type, setOpen, router]);

    const { lessons } = relatedData;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">Create a new exam</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Exam Title"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors?.title?.message}
                />
                <InputField
                    label="Start Date"
                    name="startTime"
                    type="datetime-local"
                    defaultValue={data ? new Date(data.startTime).toISOString().substr(0, 16) : undefined}
                    register={register}
                    error={errors?.startTime?.message}
                />
                <InputField
                    label="End Date"
                    name="endTime"
                    type="datetime-local"
                    defaultValue={data ? new Date(data.endTime).toISOString().substr(0, 16) : undefined}
                    register={register}
                    error={errors?.endTime?.message}
                />
                {data && (<InputField
                    label="Id"
                    name="id"
                    defaultValue={data?.id}
                    register={register}
                    error={errors?.id?.message}
                    hidden
                />
                )}
            </div>
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Lesson</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("lessonId")}
                        defaultValue={data?.teachers}
                    >
                        {lessons.map(
                            (lesson: { id: number, name: string }) => (
                            <option key={lesson.id} value={lesson.id}>{lesson.name}</option>

                        ))
                        }
                    </select>
                    {errors.lessonId && (<p className="text-xs text-red-400">{errors.lessonId.message}</p>)}
                </div>
            </div>

            {state.error && <span className="text-red-500">An error occurred while processing your request.</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ExamForm;
