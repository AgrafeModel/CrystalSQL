import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import SQLResultTable from "../queries/SQLResultTable";
import dynamic from 'next/dynamic'


const Ace = dynamic(
    () => import("../others/CodeEditor"),
    { ssr: false }
)



function QueryInput({ setQueryResult, setQueryError }) {
    const [query, setQuery] = React.useState('SELECT * FROM users WHERE id=1;');
    const [queryLoading, setQueryLoading] = React.useState(false);

    const makeQuery = (query) => {
        setQueryLoading(true)
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
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
            <div className="flex flex-row gap-2 w-full">
            <Ace onChange={(e) => setQuery(e)} value={query} />
            </div>
            <Button color='primary' auto onClick={() => makeQuery(query)}
                isLoading={queryLoading} variant="flat">
                Make Query
            </Button>
        </div>
    )
}


export default function NewQuery() {
    const [queryResult, setQueryResult] = React.useState(null);
    const [queryError, setQueryError] = React.useState(null);

    return (
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
            <div className="grid grid-cols-2 gap-2 h-full w-full items-start">
                <div className="flex flex-col gap-2">
                    <QueryInput setQueryResult={setQueryResult} setQueryError={setQueryError} />
                </div>
                <div className="flex flex-col gap-2">
                    <SQLResultTable queryResult={queryResult} queryError={queryError} />
                </div>
            </div>
        </div>
    )

}