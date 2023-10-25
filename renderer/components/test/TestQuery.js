import React from "react";
import {
    Input, Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    Code,
    Divider,

} from "@nextui-org/react";

function QueryInput({ makeQuery, queryLoading }) {
    const [query, setQuery] = React.useState('SELECT * FROM users;');


    return (
        <>
            <Input
                placeholder="Enter query here"
                value={query}
                onChange={e => setQuery(e.target.value)}
                width="100%"
                size="large"
            />
            <Button color='primary' auto onClick={() => makeQuery(query)}
             isLoading={queryLoading} variant="flat">
                Make Query
            </Button>
        </>
    )
}

export default function TestQuery() {

    const [queryResult, setQueryResult] = React.useState(null);
    const [queryLoading, setQueryLoading] = React.useState(false);
    const [queryError, setQueryError] = React.useState(null);


    const makeQuery = (query) => {
        setQueryLoading(true)
        setQueryError(null)
        setQueryResult(null)
        window.ipc.send('make-query', query)
    }

    React.useEffect(() => {
        window.ipc.on('query-made', (event, arg) => {
            setQueryError(null)
            setQueryResult(null)
            console.log(arg, event)
            //check if it's a text or a result
            if (event.success) {
                console.log(event.data)
                setQueryResult(event.data)
            } else {
                setQueryError(event.message)
            }

            setQueryLoading(false)
        })
    }, [])


    return (
        <>
            <div className="flex flex-col gap-4 p-4 text-secondary">
                <QueryInput makeQuery={makeQuery} queryLoading={queryLoading} />

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
                    <Table
                        isHeaderSticky
                        aria-label="Table"
                        classNames={{
                            base: "max-h-[70vh] overflow-y-auto",
                        }}
                        color="primary"
                        selectionMode="single"
                    >
                        <TableHeader>
                            {Object.keys(queryResult[0]).map((key, index) => {
                                //size of column is equal to the size of the item in each column
                                return (
                                    <TableColumn key={index} width={100} maxWidth={100} className="text-secondary">
                                        {key}
                                    </TableColumn>
                                )
                            })}
                        </TableHeader>
                        <TableBody className="gap-0 max-h-96 overflow-y-auto">
                            {queryResult.map((row, index) => {
                                return (
                                    <TableRow key={index} className="max-w-xs truncate">
                                        {Object.values(row).map((value, index) => {
                                            try {
                                                return (
                                                    <TableCell key={index} className="truncate max-w-xs max-h-10 border-r border-l border-gray-200 dark:border-primary-200 dark:border-opacity-20"
                                                        title={value.toString()}>
                                                        <div className="flex flex-row gap-2 max-w-xs max-h-10">
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
                    : null}
            </div>
        </>
    );



}