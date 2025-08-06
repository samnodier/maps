"use client"

import { useForm, Resolver } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { StudentSchema, studentSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createStudent, updateStudent } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { table } from "console";


const StudentForm = ({
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
    } = useForm<StudentSchema>({
        resolver: zodResolver(studentSchema) as unknown as Resolver<StudentSchema>,
    });

    const [img, setImg] = useState<any>();

    const [state, formAction] = useFormState(type === "create" ? createStudent : updateStudent, { success: false, error: false });

    const onSubmit = handleSubmit(data => {
        console.log(data);
        formAction({ ...data, img: img?.secure_url });
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Student has been ${type === "create" ? "created" : "updated"} successfully!`, {
                type: "success",
            });
            setOpen(false);
            router.refresh();
        }
    }, [state.success]);

    const { grades, classes } = relatedData;


    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">Create a new student</h1>
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
                    error={errors?.password?.message}
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
                <InputField
                    label="Parent Id"
                    name="parentId"
                    defaultValue={data?.parentId}
                    register={register}
                    error={errors?.parentId?.message}
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
                    <label className="text-xs text-gray-500">Grade</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" {...register("gradeId")} defaultValue={data?.gradeId}>
                        {grades.map((grade: { id: number; level: number }) => (<option key={grade.id} value={grade.id}>{grade.level}</option>))}
                    </select>
                    {errors.gradeId && (<p className="text-xs text-red-400">{errors.gradeId.message}</p>)}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Classes</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("classId")}
                        defaultValue={data?.classId}>
                        {classes.map(
                            (classItem: {
                                id: number;
                                name: number;
                                capacity: number;
                                _count: {
                                    students: number
                                }
                            }) => (
                                <option
                                    key={classItem.id}
                                    value={classItem.id}>(
                                    {classItem.name} - {classItem._count.students + "/" + classItem.capacity} {" "} Capacity)</option>)
                        )}
                    </select>
                    {errors.classId && (<p className="text-xs text-red-400">{errors.classId.message}</p>)}
                </div>
                <CldUploadWidget uploadPreset="mapsproject" onSuccess={(result, { widget }) => {
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

export default StudentForm;