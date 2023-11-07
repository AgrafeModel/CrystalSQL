import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn, Pagination, getKeyValue } from "@nextui-org/react"
import { Divider } from "@nextui-org/react"
import { stringify } from 'querystring';



export default function SQLResultTable({ queryResult, queryError }) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(queryResult?.length / rowsPerPage);

    const memoizedData = useMemo(() => {
        const firstPageIndex = (page - 1) * rowsPerPage;
        const lastPageIndex = firstPageIndex + rowsPerPage;
        return queryResult?.slice(firstPageIndex, lastPageIndex);
    }
        , [page, rowsPerPage, queryResult]);


    console.log("memoizedData", memoizedData);

    return (
        <div className="flex flex-col w-full">
            {queryError &&
                <div className="flex flex-col gap-2 w-full p-2">
                    <Divider />
                    <p className="text-primary text-lg">Error</p>
                    <div className="flex flex-row gap-2 bg-gray-100 dark:bg-primary-800 p-2 rounded-md">
                        <p className="text-sm text-primary dark:text-white">{queryError}</p>
                    </div>
                </div>
            }
            {queryResult && queryResult.length > 0 ?
                <>
                    <div class="relative overflow-x-auto shadow-md h-full">
                        <table class="w-full text-xs text-left divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-400">
                            <thead class="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    {Object.keys(queryResult[0]).map((key, index) => (
                                        <th scope="col" class="px-6 py-3">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {memoizedData.map((row, index) => (
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        {Object.keys(row).map((key, index) => (
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {JSON.stringify(row[key])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>


                    <div className="flex w-full justify-center">
                        {pages > 1 &&
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        }
                    </div>
                </>
                : null}
        </div>
    )
}