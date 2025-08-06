"use client"

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { teacherSchema, TeacherSchema } from "@/lib/formValidationSchemas";
import { CldUploadWidget } from "next-cloudinary";


const TeacherForm = ({
    type,
    data,
    relatedData,
    setOpen
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherSchema>({
        resolver: zodResolver(teacherSchema) as unknown as Resolver<TeacherSchema>,
    });

    const [img, setImg] = useState<any>();

    const [state, formAction] = useFormState(type === "create" ? createTeacher : updateTeacher, { success: false, error: false });

    const onSubmit = handleSubmit(data => {
        console.log(data);
        formAction({...data, img:img?.secure_url});
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Teacher has been ${type === "create" ? "created" : "updated"} successfully!`, {
                type: "success",
            });
            setOpen(false);
            router.refresh();
        }
    }, [state.success]);

    const { subjects } = relatedData;



    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a new teacher" : "Update the teacher"}</h1>
            <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Username"
                    name="username"
                    defaultValue={data?.username}
                    register={register}
                    error={errors?.username?.message}
                />
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={data?.email}
                    register={register}
                    error={errors?.email?.message}
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    defaultValue={data?.password}
                    register={register}
                    error={errors?.password?.message}
                />
            </div>
            <span className="text-xs text-gray-400 font-medium">Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="First Name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name?.message}
                />
                <InputField
                    label="Last Name"
                    name="surname"
                    defaultValue={data?.surname}
                    register={register}
                    error={errors?.surname?.message}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors?.phone?.message}
                />
                <InputField
                    label="Address"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors?.address?.message}
                />
                <InputField
                    label="Blood Type"
                    name="bloodType"
                    defaultValue={data?.bloodType}
                    register={register}
                    error={errors?.bloodType?.message}
                />
                <InputField
                    label="Birthday"
                    name="dateOfBirth"
                    type="date"
                    defaultValue={data?.dateOfBirth 
                        ? new Date(data.dateOfBirth).toISOString().split("T")[0] 
                        : ""}
                    register={register}
                    error={errors?.dateOfBirth?.message}
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
                    <label className="text-xs text-gray-500">Sex</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("sex")} defaultValue={data?.sex}>
                        <option value="MALE" selected={data?.sex === "MALE"}>Male</option>
                        <option value="FEMALE" selected={data?.sex === "FEMALE"}>Female{data?.sex === "MALE"}</option>
                    </select>
                    {errors.sex && (<p className="text-xs text-red-400">{errors.sex.message}</p>)}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Subjects</label>
                    <select multiple className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("subjects")} defaultValue={data?.subjects}>
                        {subjects.map((subject: { id: number; name: string }) => (<option key={subject.id} value={subject.id}>{subject.name}</option>))}
                    </select>
                    {errors.subjects && (<p className="text-xs text-red-400">{errors.subjects.message}</p>)}
                </div>

                <CldUploadWidget uploadPreset="mapsproject" onSuccess = {(result, {widget})=>{
                    widget.close()
                    setImg(result.info)
                }}>
                    {({ open }) => {
                        return (
                            <div className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                                <Image
                                    src={img ? img.secure_url : data?.img || "/noAvatar.png"}
                                    alt="avatar"
                                    width={28}
                                    height={28}
                                    className="rounded-full"
                                />
                                <Image src="/upload.png" alt="upload" width={28} height={28} />
                                <span className="text-xs text-gray-500">Upload Image</span>
                            </div>

                        );
                    }}
                </CldUploadWidget>
            </div>
                        {state.error && <span className="text-red-500">An error occurred while processing your request.</span>}

            <button className="bg-blue-400 text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm;