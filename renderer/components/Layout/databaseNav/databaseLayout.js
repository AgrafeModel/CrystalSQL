import React from "react"
import { Divider,Accordion,AccordionItem,Button } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileInvoice,faDatabase,faDashboard } from "@fortawesome/free-solid-svg-icons"
import DashboardNavPane from "./navPane/DashboardNavPane"
import DatabaseNavPane from "./navPane/DatabasePane"
import QueryNavPane from "./navPane/QueryPane"


function Sidebar() {

    const [connectionInfo, setConnectionInfo] = React.useState(null)
    const [firstPaneSelected, setFirstPaneSelected] = React.useState('query')

    React.useEffect(() => {
        //get connection info from local storage
        const connection = localStorage.getItem('connection')
        setConnectionInfo(JSON.parse(connection))
    }
        , [])

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
                <FirstPaneButton icon={faDashboard} text="Dashboard" selected={firstPaneSelected === 'dashboard'} onClick={() => setFirstPaneSelected('dashboard')} />
                <FirstPaneButton icon={faFileInvoice} text="Query" selected={firstPaneSelected === 'query'} onClick={() => setFirstPaneSelected('query')} />
                <FirstPaneButton icon={faDatabase} text="Database" selected={firstPaneSelected === 'database'} onClick={() => setFirstPaneSelected('database')} />

            </div>
            <Divider orientation="vertical" />
            <div id="second-pane" className="flex flex-col w-full h-full pt-4">
                {firstPaneSelected === 'dashboard' && <DashboardNavPane connectionInfo={connectionInfo} />}
                {firstPaneSelected === 'query' && <QueryNavPane connectionInfo={connectionInfo} />}
                {firstPaneSelected === 'database' && <DatabaseNavPane connectionInfo={connectionInfo} />}


            </div>
        </aside>
    )
}

export default function DatabaseLayout({ children }) {

    return (
        <div className="flex h-[calc(100vh-6.1rem)] w-screen" style={{ WebkitAppRegion: 'no-drag' }}>
            <Sidebar />
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>

    )
}