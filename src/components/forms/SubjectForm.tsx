"use client"

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { createSubject } from "@/lib/actions";
import { SubjectSchema, subjectSchema } from '../../lib/formValidationSchemas';
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const SubjectForm = ({ type, data, setOpen }: { type: "create" | "update"; data?: any; setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema) as unknown as Resolver<SubjectSchema>,
    });

    const [state, formAction] = useFormState(createSubject, {success: false, error: false});

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
    }, [state.success]);

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type==="create" ? "Create a new Subject" : "Update the Subject"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Subject Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name?.message}
                />
                
            </div>
            {state.error && <span className="text-red-500">An error occurred while processing your request.</span>}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default SubjectForm;