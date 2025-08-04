import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import { Exam, Teacher, Subject, Class, Lesson } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import { getCurrentUserId, getRole } from "@/lib/utils";

const role = await getRole();

type ExamList = Exam & {lesson: Lesson & {class: Class, teacher: Teacher, subject: Subject}}

const columns = [
    {
        header: "Subject Name", accessor: "name"
    },
    {
        header: "Class", accessor: "class",
    },
    {
        header: "Teacher", accessor: "teacher", className: "hidden md:table-cell",
    },
    {
        header: "Date", accessor: "date", className: "hidden md:table-cell",
    },
    ...(role==="admin" || role==="teacher" ? [{
        header: "Actions", accessor: "actions",
    }] : []),
];

const renderRow = (item: ExamList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mapPurpleLight">
        <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
        <td>{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US", {dateStyle: "medium"}).format(item.startTime)}</td>
        <td className="">
            <div className="flex items-center gap-2">
                { (role === "admin" || role === "teacher") &&
                    (<>
                        <FormModal table="exam" type="update" data={item} />
                        <FormModal table="exam" type="delete" id={item.id} />

                </>)}
            </div>
        </td>
    </tr>
);

const ExamListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }}) => {

    const {page, ...queryParams} = searchParams;
    const pageNumber = parseInt(page || "1");

    // URL PARAMS CONDITIONS
    const query: Prisma.ExamWhereInput = {};

    query.lesson = {};

    if(queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch(key) {
                    case "search": {
                        query.lesson.subject = {name: {contains: value, mode: "insensitive"}}
                    }
                        break;
                    case "teacherId":
                        query.lesson.teacherId = value
                        break;
                    case "classId":
                        query.lesson.classId = parseInt(value)
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
            query.lesson.teacherId = await getCurrentUserId() || "";
            break;
        case "student":
            query.lesson.class = {
                students: {
                    some: {
                        id: await getCurrentUserId() || ""
                    }
                }
            }
            break;
        case "parent":
            query.lesson.class = {
                students: {
                    some: {
                        parentId: await getCurrentUserId() || ""
                    }
                }
            }
            break;
        default:
            break;
    }

    const [examsData, totalCount] = await prisma.$transaction([
    
    prisma.exam.findMany({
        where: query,
        include: {
            lesson: {
                select: {
                    class: {select: {name: true}},
                    teacher: {select: {name: true, surname: true}},
                    subject: {select: {name: true}},
                }
            }
        },
        take: ITEMS_PER_PAGE,
        skip:  (ITEMS_PER_PAGE * (pageNumber - 1)),
    }),
    prisma.exam.count(
        {
            where: query
        }
    ),
    ]);
    

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="">
                {/*TOP*/}
                <div className="flex items-center justify-between">
                    <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/filter.png" alt="" width={14} height={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/sort.png" alt="" width={14} height={14} />
                            </button>
                            {role==="admin" && (<FormModal table="exam" type="create" />)}
                        </div>
                    </div>
                </div>

                {/*LIST*/}
                <Table columns={columns} renderRow={renderRow} data={examsData}/>

                {/*PAGINATION*/}
                <Pagination page={pageNumber} totalCount={totalCount} />
            </div>
        </div>
    )
}

export default ExamListPage;