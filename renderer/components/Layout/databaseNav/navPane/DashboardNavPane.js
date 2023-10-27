import React from "react"
import { Button, Divider } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useNavigation } from "../../../../utils/NavigationContext"
import { useDashboardContext,createNewDefaultDashboard } from "../../../../utils/DashboardManager"

export default function DashboardNavPane({ connectionInfo }) {
    const { dashboardList } = useDashboardContext();
    const { navPaneCurrentSelected,updateNavPaneCurrentSelected } = useNavigation();

    const newDashboard = () => {
        updateNavPaneCurrentSelected('dashboard',null),
        createNewDefaultDashboard(connectionInfo)
    }
    

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
                    onClick={() => newDashboard()}
                        

                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
            <div className="flex flex-col w-full items-start justify-start">
                {dashboardList.map((dashboard, index) => (
                    <div key={index} className="flex flex-row w-full items-center justify-start my-2">
                        <Button
                            color="primary"
                            variant={navPaneCurrentSelected.dashboard === dashboard.id ? "flat" : "light"}
                            onClick={() => updateNavPaneCurrentSelected('dashboard',dashboard.id)}
                            size="small"
                            className="w-full"
                            as={Link}
                            href={`/database/dashboard?dashboardId=${dashboard.id}`}
                        >
                            {dashboard.title}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}