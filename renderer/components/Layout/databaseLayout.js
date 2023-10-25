import React from "react"
import { Divider,Accordion,AccordionItem } from "@nextui-org/react"

function Sidebar() {

    const [connectionInfo, setConnectionInfo] = React.useState(null)

    React.useEffect(() => {
        //get connection info from local storage
        const connection = localStorage.getItem('connection')
        setConnectionInfo(JSON.parse(connection))
    }
        , [])



    return (
        <aside className="h-full bg-primary-100 w-64">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col px-4">
                    <p className="text-primary text-opacity-50 text-sm">Connected to</p>
                    <p className="text-primary text-lg">{connectionInfo ? connectionInfo.name : null}</p>
                    <p className="text-primary text-sm">{connectionInfo ? connectionInfo.host : null}</p>
                    <p className="text-primary text-sm">{connectionInfo ? connectionInfo.username : null}</p>
                </div>
                <Divider />
                <div className="flex flex-col px-4">
                    

                </div>
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