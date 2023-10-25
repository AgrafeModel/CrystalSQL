import React from "react";
import ConnectionCard from "./ConnectionCard";


export default function ConnectionList({ connections, setConnectionList, filter }) {
    const [connectionsDisplay, setConnectionsDisplay] = React.useState(connections);

    React.useEffect(() => {
        console.log(connections);
        if (connections) {
            setConnectionsDisplay(connections);
        }
    }
        , [connections]);

    React.useEffect(() => {
        console.log(filter);
        if (filter) {
            const filteredConnections = Object.values(connections).filter(connection => connection.name.toLowerCase().includes(filter.toLowerCase()) ||
                connection.host.toLowerCase().includes(filter.toLowerCase()) || connection.port.toLowerCase().includes(filter.toLowerCase()) || connection.username.toLowerCase().includes(filter.toLowerCase()) ||
                connection.database.toLowerCase().includes(filter.toLowerCase()) || connection.type.toLowerCase().includes(filter.toLowerCase()));
            setConnectionsDisplay(filteredConnections);
        }
        else{
            setConnectionsDisplay(connections);
        }
    },[filter]);



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {connectionsDisplay && Object.values(connectionsDisplay).map((connection, index) => (
                    <ConnectionCard key={index} connection={connection} connectionList={connections} setConnectionList={setConnectionList} />
                ))}
            </div>
        </>
    );
}
