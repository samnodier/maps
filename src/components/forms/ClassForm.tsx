"use client"

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { createClass, updateClass } from "@/lib/actions";
import { ClassSchema, classSchema } from '../../lib/formValidationSchemas';
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { relative } from "path";


const ClassForm = ({
    type,
    data,
    setOpen,
    relatedData
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClassSchema>({
        resolver: zodResolver(classSchema) as unknown as Resolver<ClassSchema>,
    });

    const [state, formAction] = useFormState(type === "create" ? createClass : updateClass, { success: false, error: false });

    const onSubmit = handleSubmit(data => {
        console.log(data);
        formAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Class has been ${type === "create" ? "created" : "updated"} successfully!`, {
                type: "success",
            });
            setOpen(false);
            router.refresh();
        }
    }, [state]);

    const { teachers, grades } = relatedData;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new Class" : "Update the Class"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Class Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name?.message}
                />
                <InputField
                    label="Capacity Name"
                    name="capacity"
                    defaultValue={data?.capacity}
                    register={register}
                    error={errors?.capacity?.message}
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
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Supervisor</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("supervisorId")}
                        defaultValue={data?.teachers}
                    >
                        {teachers.map(
                            (teacher: { id: string; name: string; surname: string; }) => (
                                <option key={teacher.id} value={teacher.id} selected={data && teacher.id === data.supervisorId}>{teacher.name + " " + teacher.surname}</option>
                            )
                        )
                        }

                    </select>
                    {errors.supervisorId?.message && (<p className="text-xs text-red-400">{errors.supervisorId.message}</p>)}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Grade</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("gradeId")}
                        defaultValue={data?.gradeId}
                    >
                        {grades.map(
                            (grade: { id: number; level: number; }) => (
                                <option key={grade.id} value={grade.id} selected={data && grade.id === data.gradeId}>{grade.level}</option>
                            )
                        )
                        }

                    </select>
                    {errors.gradeId?.message && (<p className="text-xs text-red-400">{errors.gradeId.message}</p>)}
                </div>

            </div>
            {state.error && <span className="text-red-500">An error occurred while processing your request.</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ClassForm;