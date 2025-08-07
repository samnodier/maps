"use client"

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { createSubject, updateSubject } from "@/lib/actions";
import { SubjectSchema, subjectSchema } from '../../lib/formValidationSchemas';
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { relative } from "path";


const SubjectForm = ({
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
    } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema) as unknown as Resolver<SubjectSchema>,
    });

    const [state, formAction] = useFormState(type === "create" ? createSubject : updateSubject, { success: false, error: false });

    const onSubmit = handleSubmit(data => {
        console.log(data);
        formAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Subject has been ${type === "create" ? "created" : "updated"} successfully!`, {
                type: "success",
            });
            setOpen(false);
            router.refresh();
        }
    }, [state.success, type, setOpen, router]);

    const { teachers } = relatedData;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new Subject" : "Update the Subject"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name?.message}
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
                    <label className="text-xs text-gray-500">Teachers</label>
                    <select
                        multiple
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("teachers")}
                        defaultValue={data?.teachers}
                    >
                        {teachers.map(
                            (teacher: { id: string; name: string; surname: string; }) => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name + " " + teacher.surname}</option>
                            )
                        )
                        }

                    </select>
                    {errors.teachers?.message && (<p className="text-xs text-red-400">{errors.teachers.message}</p>)}
                </div>

            </div>
            {state.error && <span className="text-red-500">An error occurred while processing your request.</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default SubjectForm;