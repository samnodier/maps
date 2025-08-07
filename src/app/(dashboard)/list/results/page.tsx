import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import { Result, Lesson, Class, Teacher, Subject, Student } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId, getRole } from "@/lib/utils";

type ResultList = {
    id: number,
    title: string,
    studentName: string,
    studentSurname: string,
    score: number,
    teacherName: string,
    teacherSurname: string,
    className: string,
    date: string,
    startTime: Date,
    
}

const ResultListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }}) => {
    
    const role = await getRole();
    
    const columns = [
        {
            header: "Title", accessor: "title"
        },
        {
            header: "Student", accessor: "student",
        },
        {
            header: "Score", accessor: "score", className: "hidden md:table-cell",
        },
        {
            header: "Teacher", accessor: "teacher", className: "hidden md:table-cell",
        },
        {
            header: "Class", accessor: "class", className: "hidden md:table-cell",
        },
        {
            header: "Date", accessor: "date", className: "hidden md:table-cell",
        },
        ...(role==="admin" || role==="teacher" ? [{
            header: "Actions", accessor: "actions",
        }] : []),
    ];
    
    const renderRow = (item: ResultList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mapPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td>{item.studentName + " " + item.studentSurname}</td>
            <td className="hidden md:table-cell">{item.score}</td>
            <td className="hidden md:table-cell">{item.teacherName + " " + item.teacherSurname}</td>
            <td className="hidden md:table-cell">{item.className}</td>
            <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US", {dateStyle: "medium"}).format(item.startTime)}</td>
            <td className="">
                <div className="flex items-center gap-2">
                    { (role === "admin" || role === "teacher") && (
                        <>
                            <FormModal table="result" type="update" data={item} />
                            <FormModal table="result" type="delete" id={item.id} />
                            </>
                    )}
                </div>
            </td>
        </tr>
    );

    const {page, ...queryParams} = searchParams;
    const pageNumber = parseInt(page || "1");

    // URL PARAMS CONDITIONS
    const query: Prisma.ResultWhereInput = {};
    if(queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch(key) {
                    case "search": {
                        query.OR = [
                            {exam: {
                                title: {contains: value, mode: "insensitive"}
                            }},      
                            {assignment: {
                                title: {contains: value, mode: "insensitive"}
                            }},
                            {student: {
                                name: {contains: value, mode: "insensitive"}
                            }},
                            {student: {
                                surname: {contains: value, mode: "insensitive"}
                            }},
                        ]
                    }
                        break;
                    case "studentId": {
                        query.studentId = value
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // ROLE CONDITIONS
    switch(role) {
        case "admin":
            break;
        case "teacher":
            query.OR = [
                {exam: {lesson: {teacherId: await getCurrentUserId() || ""}}},
                {assignment: {lesson: {teacherId: await getCurrentUserId() || ""}}},
            ]
            break;
        case "student":
            query.studentId = await getCurrentUserId() || "";
            break;
        case "parent":
            query.studentId = await getCurrentUserId() || "";
            break;
        default:
            break;
    }

    const [resultsDataResponse, totalCount] = await prisma.$transaction([
    
    prisma.result.findMany({
        where: query,
        include: {
            student: {select: {name: true, surname: true}},
            exam: {
                include: {
                    lesson: {
                        select: {
                            class: {select: {name: true}},
                            teacher: {select: {name: true, surname: true}},
                        }
                    }
                }
            },
            assignment: {
                include: {
                    lesson: {
                        select: {
                            class: {select: {name: true}},
                            teacher: {select: {name: true, surname: true}},
                        }
                    }
                }
            },
        },
        take: ITEMS_PER_PAGE,
        skip:  (ITEMS_PER_PAGE * (pageNumber - 1)),
    }),
    prisma.result.count(
        {
            where: query
        }
    ),
    ]);

    const resultsData = resultsDataResponse.map((result) => {
        const assessment = result.exam || result.assignment;

        if (!assessment) return null;

        const isExam = "startTime" in assessment;

        return{
            id: result.id,
            title: assessment.title,
            studentName: result.student.name,
            studentSurname: result.student.surname,
            score: result.score,
            teacherName: assessment.lesson.teacher.name,
            teacherSurname: assessment.lesson.teacher.surname,
            className: assessment.lesson.class.name,
            date: new Intl.DateTimeFormat("en-US", {dateStyle: "medium"}).format(isExam ? assessment.startTime : assessment.dueDate),
            startTime: isExam ? assessment.startTime : assessment.startDate,
        }
    });


    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="">
                {/*TOP*/}
                <div className="flex items-center justify-between">
                    <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow" title="Filter results" aria-label="Filter results">
                                <Image src="/filter.png" alt="Filter" width={14} height={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow" title="Sort results" aria-label="Sort results">
                                <Image src="/sort.png" alt="Sort" width={14} height={14} />
                            </button>
                            {role==="admin" && (<FormModal table="result" type="create" />)}
                        </div>
                    </div>
                </div>

                {/*LIST*/}
                <Table columns={columns} renderRow={renderRow} data={resultsData}/>

                {/*PAGINATION*/}
                <Pagination page={pageNumber} totalCount={totalCount} />
            </div>
        </div>
    )
}

export default ResultListPage;