"use server"

import { revalidatePath } from "next/cache";
import { SubjectSchema, TeacherSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";
import { boolean } from "zod";

type currentState = {success: boolean, error: boolean};

export const createSubject = async (currentState: currentState, data: SubjectSchema) => {

    try {
        await prisma.subject.create({
            data: {
                name: data.name,
                teachers: {
                    connect: data.teachers.map((teacherId: string) => ({ id: teacherId }))
                }
            }
        });
        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return{success: false, error: true};
    }
}

export const updateSubject = async (currentState: currentState, data: SubjectSchema) => {

    try {
        await prisma.subject.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                teachers: {
                    set: data.teachers.map((teacherId: string) => ({ id: teacherId }))
                }
            }
        });
        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return{success: false, error: true};
    }
}

export const deleteSubject = async (currentState: currentState, data: FormData) => {

    const id = data.get("id") as string
    try {
        await prisma.subject.delete({
            where: {
                id: parseInt(id)
            },
        });
        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return{success: false, error: true};
    }
}



// Create Teacher
// export const createTeacher = async (currentState: currentState, data: TeacherSchema) => {
//     try {
//         await prisma.teacher.create({
//             data: {
//                 username: data.username,
//                 email: data.email,
//                 password: data.password,
//             }
//         });
//         // revalidatePath("/list/teachers");
//         return { success: true, error: false };
//     } catch (error) {
//         console.log(error);
//         return { success: false, error: true };
//     }
// }