import React from "react"
import { Divider, Accordion, AccordionItem, Button } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileInvoice, faDatabase, faDashboard } from "@fortawesome/free-solid-svg-icons"
import DashboardNavPane from "./navPane/DashboardNavPane"
import DatabaseNavPane from "./navPane/DatabasePane"
import QueryNavPane from "./navPane/QueryPane"
import { useRouter } from "next/router"
import Link from "next/link"
import { useNavigation } from "../../../utils/NavigationContext"


function Sidebar() {

    const [connectionInfo, setConnectionInfo] = React.useMemo(() => [null, null])

    const router = useRouter()
    const { query } = router
    const { sidebarSectionSelected, setSidebarSectionSelected } = useNavigation()




    function FirstPaneButton({ icon, text, selected, onClick }) {

        return (
            <Button
                variant={selected ? 'flat' : 'light'}
                onClick={onClick}
                color="primary"
                isIconOnly
            >
                <FontAwesomeIcon icon={icon} size="lg" />
            </Button>
        )
    }



    return (
        <aside className="h-full bg-primary-100 w-64 flex flex-row flex-shrink-0">
            <div id="first-pane" className="flex flex-col w-1/4 h-full items-center justify-start py-2 gap-2">
                <FirstPaneButton icon={faDashboard} text="Dashboard" selected={sidebarSectionSelected === 'dashboard'} onClick={() => setSidebarSectionSelected('dashboard')}/>
                <FirstPaneButton icon={faFileInvoice} text="Query" selected={sidebarSectionSelected === 'query'} onClick={() => setSidebarSectionSelected('query')} />
                <FirstPaneButton icon={faDatabase} text="Database" selected={sidebarSectionSelected === 'database'} onClick={() => setSidebarSectionSelected('database')} />
            </div>
            <Divider orientation="vertical" />
            <div id="second-pane" className="flex flex-col w-full h-full pt-4">
                {sidebarSectionSelected === 'dashboard' && <DashboardNavPane connectionInfo={connectionInfo} />}
                {sidebarSectionSelected === 'query' && <QueryNavPane connectionInfo={connectionInfo} />}
                {sidebarSectionSelected === 'database' && <DatabaseNavPane connectionInfo={connectionInfo} />}


            </div>
        </aside>
    )
}

export default function DatabaseLayout({ children }) {

    const memoizedSidebar = React.useMemo(() => {
        return (
            <>
                <Sidebar />
            </>
        )
    }, []);


    return (

            <div className="flex h-[calc(100vh-6.1rem)] w-screen" style={{ WebkitAppRegion: 'no-drag' }}>
                {memoizedSidebar}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>


    )
}