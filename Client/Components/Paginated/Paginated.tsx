import { PaginatedProps } from "@/Ts/PaginatedProps";

export const Paginated = ({
    currentPage,
    totalPages,
    handleLimitChange,
    loadPage,
    limit,
}: PaginatedProps) => {
    return (
        <nav className="flex w-full justify-end items-center pb-3" >
            <div className="w-full justify-center pl-32 items-center flex"
                style={{ minWidth: "450px" }}
            >

                <section className="flex items-center justify-between p-4 bg-white shadow rounded max-w-3xl w-full ">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => loadPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="font-semibold">
                        {currentPage} de {totalPages}
                    </span>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => loadPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </section>
            </div>
            <section className="ml-4 flex flex-col justify-end items-center">
                <label htmlFor="limit" className="mr-2">Items por página:</label>
                <select
                    className="border border-gray-300 rounded py-2 px-4"
                    onChange={handleLimitChange}
                    id="limit"
                    defaultValue={limit}
                >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                </select>
            </section>
        </nav>
    );
};
