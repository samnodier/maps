import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {lessonsData} from "@/lib/data";
import {role} from "@/lib/data";
import FormModal from "@/components/FormModal";

type Lesson = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
}

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
        header: "Actions", accessor: "actions",
    },
];

const LessonListPage = () => {

    const renderRow = (item: Lesson) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mapPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.subject}</td>
            <td>{item.class}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="">
                <div className="flex items-center gap-2">
                    { role === "admin"  && (
                    <>
                    <FormModal table="lesson" type="update" data={item} />
                    <FormModal table="lesson" type="delete" id={item.id} />
                    </>
)}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="">
                {/*TOP*/}
                <div className="flex items-center justify-between">
                    <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/filter.png" alt="" width={14} height={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/sort.png" alt="" width={14} height={14} />
                            </button>
                            {role==="admin" && (<FormModal table="lesson" type="create" />)}
                        </div>
                    </div>
                </div>

                {/*LIST*/}
                <Table columns={columns} renderRow={renderRow} data={lessonsData}/>

                {/*PAGINATION*/}
                <Pagination />
            </div>
        </div>
    )
}

export default LessonListPage;