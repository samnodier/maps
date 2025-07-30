import { ITEMS_PER_PAGE } from "@/lib/settings";

const Pagination = ({page, totalCount}: {page: number, totalCount: number}) => {
    return (
        <div className="py-4 flex items-center justify-between text-gray-500">
            <button disabled className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
            <div className="flex items-center gap-2 text-sm">
                {Array.from({length: Math.ceil(totalCount / ITEMS_PER_PAGE)}).map((_, index) => {
                    const pageIndex = index + 1;
                    return (
                        <button key={pageIndex} className={`px-2 rounded-sm ${page === pageIndex ? "bg-mapSky": ""}`} >
                            {pageIndex}
                        </button>
                    )
                })}
            </div>
            <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
        </div>
    )
}

export default Pagination;