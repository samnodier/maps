import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {studentsData} from "@/lib/data";
import {role} from "@/lib/data";
import FormModal from "@/components/FormModal";

type Student = {
    id: number;
    studentId: string;
    name: string;
    email?: string;
    photo: string;
    phone?: string;
    grade: string[];
    class: string[];
    address: string;
}

const columns = [
    {
        header: "Info", accessor: "info"
    },
    {
        header: "Student ID", accessor: "studentId", className: "hidden md:table-cell",
    },
    {
        header: "Grade", accessor: "grade", className: "hidden md:table-cell",
    },
    {
        header: "Phone", accessor: "phone", className: "hidden lg:table-cell",
    },
    {
        header: "Address", accessor: "address", className: "hidden lg:table-cell",
    },
    {
        header: "Actions", accessor: "actions",
    },
];

const StudentListPage = () => {

    const renderRow = (item:Student) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mapPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <Image src={item.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.class}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.studentId}</td>
            <td className="hidden md:table-cell">{item.grade}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td className="">
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mapSky">
                            <Image src="/view.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    { role === "admin" && (
                        <FormModal table="student" type="delete" id={item.id} />
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
                    <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/filter.png" alt="" width={14} height={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/sort.png" alt="" width={14} height={14} />
                            </button>
                            {role==="admin" && (
                                <FormModal table="student" type="create" /> )}
                        </div>
                    </div>
                </div>

                {/*LIST*/}
                <Table columns={columns} renderRow={renderRow} data={studentsData}/>

                {/*PAGINATION*/}
                <Pagination />
            </div>
        </div>
    )
}

export default StudentListPage;