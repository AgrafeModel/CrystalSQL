import React from "react"
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function QueryNavPane({ connectionInfo }) {
    const [queries, setQueries] = React.useState([])

    React.useEffect(() => {
        //get queries from main process
        window.ipc.send('get-queries')
        window.ipc.on('queries', (event, arg) => {
            if (event.success) {
                setQueries(event.data)
            } else {
                console.log(event.message)
            }
        })
    }, [])




    return (
        <div className="flex flex-col w-full items-start justify-start px-4">
            <div className="flex flex-row w-full items-center justify-between">
                <p className="text-primary text-lg">Saved Queries</p>
                <Button
                    color="primary"
                    auto
                    isIconOnly
                    variant="light"
                    radius="full"
                    size="sm"
                    as={Link}
                    href="/database/query/new"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
            <div className="flex flex-col w-full items-start justify-start">
                {queries.map(query => (
                    <Button
                        key={query.id}
                        color="primary"
                        auto
                        variant="light"
                        radius="none"
                        size="sm"
                        className="w-full text-left"
                    >
                        {query.name}
                    </Button>
                ))}
                {queries.length === 0 && <p className="text-primary text-opacity-50">No queries saved</p>}
            </div>
        </div>
    )
}