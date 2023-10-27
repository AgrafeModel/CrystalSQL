import React from "react"
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useQueryContext } from "../../../../utils/QueryManager"
import { useNavigation } from "../../../../utils/NavigationContext"

export default function QueryNavPane({ connectionInfo }) {

    const { queryList } = useQueryContext()
    const { navPaneCurrentSelected,updateNavPaneCurrentSelected } = useNavigation();

    return (
        <div className="flex flex-col w-full items-start justify-start px-4">
            <div className="flex flex-row w-full items-center justify-between">
                <p className="text-primary text-lg">Saved Queries</p>
                <Button
                    color="primary"
                    isIconOnly
                    variant="light"
                    radius="full"
                    size="sm"
                    as={Link}
                    href="/database/query/edit"
                    onClick={() => updateNavPaneCurrentSelected('query',null)}
                    
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
            <div className="flex flex-col w-full items-start justify-start">
                {queryList.map((query, index) => (
                    <Button
                        key={index}
                        color="primary"
                        variant={navPaneCurrentSelected.query && navPaneCurrentSelected.query.id === query.id ? "flat" : "light"}
                        size="small"
                        className="w-full text-left justify-start"
                        as={Link}
                        href={`/database/query/edit?queryId=${query.id}`}
                        onClick={() => updateNavPaneCurrentSelected('query',query)}
                     
                    >
                        {query.name}
                    </Button>
                ))}


               
            </div>
        </div>
    )
}