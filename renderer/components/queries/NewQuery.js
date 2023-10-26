import React from "react";
import {
    Input,
    Button,
    Textarea,
    Divider,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";
import SQLResultTable from "../queries/SQLResultTable";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSave } from "@fortawesome/free-solid-svg-icons";
import {
    saveQuery,
    updateQuery,
    deleteQuery,
    useQueryContext,
} from "../../utils/QueryManager";
import Link from "next/link";
const Ace = dynamic(() => import("../others/CodeEditor"), { ssr: false });

export default function NewQuery({ defaultQuery }) {
    const [queryResult, setQueryResult] = React.useState(null);
    const [queryError, setQueryError] = React.useState(null);
    const [query, setQuery] = React.useState(
        defaultQuery ? defaultQuery.query : ""
    );
    const [queryLoading, setQueryLoading] = React.useState(false);
    const [queryName, setQueryName] = React.useState(
        defaultQuery ? defaultQuery.name : ""
    );
    const [isInputNameFocused, setIsInputNameFocused] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [deletePopopen, setDeletePopopen] = React.useState(false);



    React.useEffect(() => {
        window.ipc.on("query-made", (event, arg) => {
            setQueryError(null);
            setQueryResult(null);
            if (event.success) {
                setQueryResult(event.data);
            } else {
                setQueryError(event.message);
            }

            setQueryLoading(false);
        });
    }, []);

    React.useEffect(() => {
        if (defaultQuery) {
            console.log("default query found", defaultQuery.id);
            setQuery(defaultQuery.query);
            setQueryName(defaultQuery.name);
            setQueryError(null);
        } else {
            setQuery("");
            setQueryName("");
            setQueryError(null);
        }
    }, [defaultQuery]);

    const makeQuery = (query) => {
        setQueryLoading(true);
        window.ipc.send("make-query", query);
    };

    const saveQueryHandle = () => {
        setError(null);
        //if there a default query, update it
        let success = false;
        if (defaultQuery) {
            success = updateQuery({
                id: defaultQuery.id,
                name: queryName,
                query: query,
            });
            if (!success) {
                setError("Query name already exists");
            }
        } else {
            success = saveQuery({ name: queryName, query: query });
            if (success) {
                setQueryName("");
                setQuery("");
            } else {
                setError("Query name already exists");
            }
        }
    };

    const DeleteQueryHandle = () => { 
        //get the id of the query
        const id = defaultQuery.id;
        if(id){
            setDeletePopopen(false)
            deleteQuery(id);
        }
    };

    return (
        <div className="flex flex-col w-full h-full justify-start items-center">
            <div className="flex flex-row gap-2 w-full justify-between items-center bg-primary-50 p-2">
                <Input
                    value={queryName}
                    onChange={(e) => setQueryName(e.target.value)}
                    placeholder={error ? error : "Query name"}
                    variant="faded"
                    color="primary"
                />
                <Button
                    onClick={() => makeQuery(query)}
                    loading={queryLoading}
                    auto
                    size="small"
                    color="primary"
                    variant="flat"
                >
                    Run Query
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
                <Button
                    onClick={() => saveQueryHandle()}
                    auto
                    size="small"
                    color="primary"
                    variant="flat"
                >
                    Save Query
                    <FontAwesomeIcon icon={faSave} />
                </Button>
            </div>
            <Divider />
            <div className="grid grid-cols-2 h-full w-full items-start">
                <div className="flex flex-col gap-2 h-full w-full">
                    <Ace onChange={(e) => setQuery(e)} value={query} />
                </div>
                <div className="flex flex-col gap-2">
                    <SQLResultTable queryResult={queryResult} queryError={queryError} />
                </div>
            </div>
            <div className="flex flex-row gap-2 w-full h-full justify-between items-center bg-primary-50 p-2">
                <Popover isOpen={deletePopopen} onOpenChange={(e) => setDeletePopopen(e)}>
                    <PopoverTrigger>
                        <Button auto size="small" color="primary" variant="flat">
                            Delete Query
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex flex-col gap-2 p-2">
                            <Button
                                onClick={() => DeleteQueryHandle()}
                                size="small"
                                color="primary"
                                variant="flat"
                                as={Link}
                                href="/database/query/edit"
                            >
                                Confirm
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
