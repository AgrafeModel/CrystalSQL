import React from "react";
import {
    Input,
    Button,
} from "@nextui-org/react";
import SQLResultTable from "../queries/SQLResultTable";



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
                <SQLResultTable queryResult={queryResult} queryError={queryError} />
            </div>
        </>
    );



}