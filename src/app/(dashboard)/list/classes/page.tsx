import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {classesData} from "@/lib/data";
import {role} from "@/lib/data";

type Class = {
    id: number;
    name: string;
    capacity: number;
    grade: number;
    supervisor: string;

}

const columns = [
    {
        header: "Class Name", accessor: "name"
    },
    {
        header: "Capacity", accessor: "capacity", className: "hidden md:table-cell",
    },
    {
        header: "Grade", accessor: "grade", className: "hidden md:table-cell",
    },
    {
        header: "Supervisor", accessor: "supervisor", className: "hidden md:table-cell",
    },
    {
        header: "Actions", accessor: "actions",
    },
];

const ClassListPage = () => {

    const renderRow = (item: Class) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-mapPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.name}</td>
            <td className="hidden md:table-cell">{item.capacity}</td>
            <td className="hidden md:table-cell">{item.grade}</td>
            <td className="hidden md:table-cell">{item.supervisor}</td>
            <td className="">
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-mapSky">
                            <Image src="/edit.png" alt="" width={16} height={16} />
                        </button>
                    </Link>
                    { role === "admin" && (<button className="w-7 h-7 flex items-center justify-center rounded-full bg-mapPurple">
                        <Image src="/delete.png" alt="" width={16} height={16}/>
                    </button>)}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="">
                {/*TOP*/}
                <div className="flex items-center justify-between">
                    <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
                    <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                        <TableSearch />
                        <div className="flex items-center gap-4 self-end">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/filter.png" alt="" width={14} height={14} />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/sort.png" alt="" width={14} height={14} />
                            </button>
                            {role==="admin" && (<button className="w-8 h-8 flex items-center justify-center rounded-full bg-mapYellow">
                                <Image src="/plus.png" alt="" width={14} height={14}/>
                            </button>)}
                        </div>
                    </div>
                </div>

                {/*LIST*/}
                <Table columns={columns} renderRow={renderRow} data={classesData}/>

                {/*PAGINATION*/}
                <Pagination />
            </div>
        </div>
    )
}

export default ClassListPage;