import React from "react"
import { Accordion, AccordionItem, Button, Divider } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useNavigation } from "../../../../utils/NavigationContext"


export default function DashboardNavPane({ connectionInfo }) {

    const { navPaneCurrentSelected,updateNavPaneCurrentSelected } = useNavigation();

    return (
        <div className="flex flex-col w-full items-start justify-start px-4">
            <div className="flex flex-row w-full items-center justify-between">
                <p className="text-primary text-lg">Dashboard</p>
                <Button
                    color="primary"
                    isIconOnly
                    variant="light"
                    radius="full"
                    size="sm"
                    as={Link}
                    href="/database/dashboard/new"
                    onClick={() => updateNavPaneCurrentSelected('dashboard',null)}

                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
            <div className="flex flex-col w-full items-start justify-start">
                <Button
                    variant={navPaneCurrentSelected.dashboard === 0 ? "flat" : "light"}
                    color="primary"
                    size="small"
                    className="w-full text-left justify-start"
                    as={Link}
                    href={`/database/dashboard?dashboardId=0`}
                    onClick={() => updateNavPaneCurrentSelected('dashboard',0)}
                >
                    Main Dashboard
                </Button>
            </div>
        </div>
    )
}