"use server"

import { revalidatePath } from "next/cache";
import { SubjectSchema, ClassSchema, TeacherSchema, StudentSchema, ExamSchema } from "./formValidationSchemas";
import { prisma } from "./prisma";
import { boolean } from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import { getCurrentUserId, getRole } from "./utils";

type currentState = { success: boolean, error: boolean };

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
        return { success: false, error: true };
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
        return { success: false, error: true };
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
        return { success: false, error: true };
    }
}

export const createClass = async (currentState: currentState, data: ClassSchema) => {

    try {
        await prisma.class.create({
            data
        });
        // revalidatePath("/list/classs");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

export const updateClass = async (currentState: currentState, data: ClassSchema) => {

    try {
        await prisma.class.update({
            where: {
                id: data.id
            },
            data
        });
        // revalidatePath("/list/classs");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

export const deleteClass = async (currentState: currentState, data: FormData) => {

    const id = data.get("id") as string
    try {
        await prisma.class.delete({
            where: {
                id: parseInt(id)
            },
        });
        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

export const createTeacher = async (currentState: currentState, data: TeacherSchema) => {

    try {
        const clerk = await clerkClient();
        const user = await clerk.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: {
                role: "teacher",
            }
        })

        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                img: data.img || null,
                phone: data.phone || null,
                address: data.address,
                bloodType: data.bloodType,
                sex: data.sex,
                dateOfBirth: data.dateOfBirth,
                subjects: {
                    connect: data.subjects?.map((subjectId: string) => ({ id: parseInt(subjectId) }))
                }
            }
        });
        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

/**
 * Updates a teacher in the database.
 * @param currentState The current state of the form, used to determine whether
 * the form was successfully submitted or not.
 * @param data The data to be updated, including the id of the teacher to be
 * updated.
 * @returns An object with two boolean properties, success and error. If the
 * update is successful, success is true and error is false. If the update fails,
 * success is false and error is true.
 */
export const updateTeacher = async (currentState: currentState, data: TeacherSchema) => {

    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const clerk = await clerkClient();
        const user = await clerk.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: {
                role: "teacher",
            }
        })

        await prisma.teacher.update({
            where: {
                id: data.id
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                img: data.img || null,
                phone: data.phone || null,
                address: data.address,
                bloodType: data.bloodType,
                sex: data.sex,
                dateOfBirth: data.dateOfBirth,
                subjects: {
                    set: data.subjects?.map((subjectId: string) => ({ id: parseInt(subjectId) }))
                }
            }
        });        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

/**
 * Deletes a teacher from the database.
 * @param currentState The current state of the form, used to determine whether
 * the form was successfully submitted or not.
 * @param data The data to be deleted, including the id of the teacher to be
 * deleted.
 * @returns An object with two boolean properties, success and error. If the
 * deletion is successful, success is true and error is false. If the deletion
 * fails, success is false and error is true.
 */
export const deleteTeacher = async (currentState: currentState, data: FormData) => {

    const id = data.get("id") as string
    try {
        const clerk = await clerkClient();
        await clerk.users.deleteUser(id);

        await prisma.teacher.delete({
            where: {
                id: id
            },
        });
        // revalidatePath("/list/teachers");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

export const createStudent = async (currentState: currentState, data: StudentSchema) => {

    try {
        const classItem = await prisma.class.findUnique({
            where: {
                id: data.classId
            },
            include: {
                _count: { select: { students: true } }
            }
        });

        if (classItem && classItem._count.students === classItem.capacity) {
            return { success: false, error: true, message: "Class is full" };
        }

        const clerk = await clerkClient();
        const user = await clerk.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: {
                role: "student",
            }
        })

        await prisma.student.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                img: data.img || null,
                phone: data.phone || null,
                address: data.address,
                bloodType: data.bloodType,
                sex: data.sex,
                dateOfBirth: data.dateOfBirth,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            }
        });
        // revalidatePath("/list/class");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

/**
 * Updates a student in the database.
 * @param currentState The current state of the form, used to determine whether
 * the form was successfully submitted or not.
 * @param data The data to be updated, including the id of the student to be
 * updated.
 * @returns An object with two boolean properties, success and error. If the
 * update is successful, success is true and error is false. If the update fails,
 * success is false and error is true.
 */
export const updateStudent = async (currentState: currentState, data: StudentSchema) => {

    if (!data.id) {
        return { success: false, error: true };
    }
    try {
        const clerk = await clerkClient();
        const user = await clerk.users.updateUser(data.id, {
            username: data.username,
            ...(data.password !== "" && { password: data.password }),
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: {
                role: "student",
            }
        })

        await prisma.student.update({
            where: {
                id: data.id
            },
            data: {
                ...(data.password !== "" && { password: data.password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email || null,
                img: data.img || null,
                phone: data.phone || null,
                address: data.address,
                bloodType: data.bloodType,
                sex: data.sex,
                dateOfBirth: data.dateOfBirth,
                gradeId: data.gradeId,
                classId: data.classId,
                parentId: data.parentId,
            }
        });        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

/**
 * Deletes a student from the database.
 * @param currentState The current state of the form, used to determine whether
 * the form was successfully submitted or not.
 * @param data The data to be deleted, including the id of the student to be
 * deleted.
 * @returns An object with two boolean properties, success and error. If the
 * deletion is successful, success is true and error is false. If the deletion
 * fails, success is false and error is true.
 */
export const deleteStudent = async (currentState: currentState, data: FormData) => {

    const id = data.get("id") as string
    try {

        const clerk = await clerkClient();
        await clerk.users.deleteUser(id);

        await prisma.student.delete({
            where: {
                id: id
            },
        });
        // revalidatePath("/list/students");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}





export const createExam =

    async (currentState: currentState, data: ExamSchema) => {

        const role = await getRole();
        const userId = await getCurrentUserId();

        try {

            if (role === "teacher") {
                const teacherLessons = await prisma.lesson.findFirst({
                    where: {
                        teacherId: userId!,
                        id: data.lessonId
                    },
                });

                if (!teacherLessons) {
                    return { success: false, error: true, message: "You are not allowed to create an exam for this lesson" };
                }
            }
            await prisma.exam.create({
                data: {
                    title: data.title,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    lessonId: data.lessonId,
                }
            });
            // revalidatePath("/list/subjects");
            return { success: true, error: false };
        } catch (error) {
            console.log(error);
            return { success: false, error: true };
        }
    }

export const updateExam = async (currentState: currentState, data: ExamSchema) => {

    const role = await getRole();
    const userId = await getCurrentUserId();

    try {

        if (role === "teacher") {
            const teacherLessons = await prisma.lesson.findFirst({
                where: {
                    teacherId: userId!,
                    id: data.lessonId
                },
            });

            if (!teacherLessons) {
                return { success: false, error: true, message: "You are not allowed to create an exam for this lesson" };
            }
        }

        await prisma.exam.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            },
        });
        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}

export const deleteExam = async (currentState: currentState, data: FormData) => {

    const id = data.get("id") as string

    const role = await getRole();
    const userId = await getCurrentUserId();

    try {
        await prisma.exam.delete({
            where: {
                id: parseInt(id),
                ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {})
            },
        });
        // revalidatePath("/list/subjects");
        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true };
    }
}


