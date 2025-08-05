import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {subjectsData} from "@/lib/data";
import FormModal from "@/components/FormModal";
import { Prisma, Subject, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRole } from "@/lib/utils";
import FormContainer from "@/components/FormContainer";

const role = await getRole();

type SubjectList = Subject & {teachers: Teacher[]}

const columns = [
    {
        header: "Subject Name", accessor: "name"
    },
    {
        header: "Teachers", accessor: "teachers", className: "hidden md:table-cell",
    },
    {
        header: "Actions", accessor: "actions",
    },
];

const renderRow = (item: SubjectList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mapPurpleLight">
        <td className="flex items-center gap-4 p-4">
            {item.name}
        </td>
        <td className="hidden md:table-cell">
            {item.teachers.map(teacher => teacher.name).join(",")}
        </td>
        <td className="">
            <div className="flex items-center gap-2">
                { role === "admin" &&(
                    <>
                        <FormContainer table="subject" type="update" data={item} />
                        <FormContainer table="subject" type="delete" id={item.id} />
                </>
                )}
            </div>
        </td>
    </tr>
);

const SubjectListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined }}) => {

    const {page, ...queryParams} = searchParams;
    const pageNumber = parseInt(page || "1");

    // URL PARAMS CONDITIONS
    const query: Prisma.SubjectWhereInput = {};
    if(queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch(key) {
                    case "search": {
                        query.name = {
                            contains: value,
                            mode: "insensitive"
                        }
                    }
                    break;
                    default:
                        break;
                }
            }
        }
    }


    const [subjectsData, totalCount] = await prisma.$transaction([
    
    prisma.subject.findMany({
        where: query,
        include: {
            teachers: true,
        },
        take: ITEMS_PER_PAGE,
        skip:  (ITEMS_PER_PAGE * (pageNumber - 1)),
    }),
    prisma.subject.count(
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
                    <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/filter.png" alt="" width={14} height={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/sort.png" alt="" width={14} height={14} />
                            </button>
                            {role==="admin" && (<FormContainer table="subject" type="create" />)}
                        </div>
                    </div>
                </div>

                {/*LIST*/}
                <Table columns={columns} renderRow={renderRow} data={subjectsData}/>

                {/*PAGINATION*/}
                <Pagination page={pageNumber} totalCount={totalCount} />
            </div>
        </div>
    )
}

export default SubjectListPage;