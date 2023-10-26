import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn, Pagination, getKeyValue } from "@nextui-org/react"
import { Divider } from "@nextui-org/react"



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

    const classNames = React.useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            //TODO: REMOVE RADIUS FROM HEADER]
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );


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
                    <Table
                        aria-label="Example table with client side pagination"
                        radius='none'
                        shadow='none'
                        classNames={classNames}
                        removeWrapper
                        className=' h-[65vh] overflow-y-auto'
                        isHeaderSticky


                    >
                        <TableHeader>
                            {Object.keys(queryResult[0]).map((key, index) => {
                                //size of column is equal to the size of the item in each column
                                return (
                                    <TableColumn key={index} width={100} maxWidth={100} className="text-secondary font-bold ">
                                        {key}
                                    </TableColumn>
                                )
                            })}
                        </TableHeader>
                        <TableBody className="gap-0 max-h-96 overflow-y-auto ">
                            {memoizedData.map((row, index) => {
                                return (
                                    <TableRow key={index} className="max-w-xs truncate">
                                        {Object.values(row).map((value, index) => {
                                            try {
                                                return (
                                                    <TableCell key={index} className="truncate max-w-xs max-h-10 border-r border-gray-200 dark:border-primary-200 dark:border-opacity-20 py-0"
                                                        title={value.toString()}>
                                                        <div className="flex flex-row gap-2 max-w-xs">
                                                            {value ? (
                                                                <p className="text-secondary text-sm">{value.toString()}</p>
                                                            ) : (
                                                                <p className="text-secondary text-sm italic text-opacity-50">NULL</p>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
                                            catch (e) {
                                                return (
                                                    <TableCell key={index} className="truncate max-w-xs max-h-10"
                                                        title={value}>
                                                        <div className="flex flex-row gap-2 max-w-xs max-h-10">
                                                            {value ? (
                                                                <p className="text-secondary text-sm">{value}</p>
                                                            ) : (
                                                                <p className="text-secondary text-sm italic text-opacity-50">NULL</p>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                )
                                            }
                                        })}
                                    </TableRow>
                                )
                            })}



                        </TableBody>
                    </Table>
                    <div className="flex w-full justify-center">
                        {pages > 1 &&
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
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