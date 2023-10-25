import React from 'react';
import { Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure, Button, Card, CardHeader, CardBody, CardFooter, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import ConnectionCard from './ConnectionCard';
import EditConnectionModal from './EditConnectionModal';
import ConnectionList from './ConnectionList';
import SettingsModal from './AllConnectionsSettings';


function SearchBar({ connectionList, setConnectionList, setFilter }) {
    return (
        <>
            <div className="flex justify-center flex-row w-full">
                <Input placeholder="Search" width="100%" color='primary' variant='faded' radius='none' onChange={(e) => setFilter(e.target.value)} />
                <EditConnectionModal connectionList={connectionList} setConnectionList={setConnectionList} />
                <SettingsModal connectionList={connectionList} setConnectionList={setConnectionList} />
            </div>
        </>
    );
}


function LandingPage() {
    const [connections, setConnections] = React.useState(null);
    const [filter, setFilter] = React.useState('');
    React.useEffect(() => {
        window.ipc.on('connections', (event, arg) => {
            setConnections(event);
        });
        window.ipc.send('get-connections', 'get-connections');
    }
        , []);



    return (
        <div className="flex flex-col gap-4 w-full p-4">
            {connections ? (
                <>
                    <SearchBar connectionList={connections} setConnectionList={setConnections} setFilter={setFilter} />
                    <ConnectionList connections={connections} setConnectionList={setConnections} filter={filter} />
                </>
            ) : (
                <p className='text-primary text-lg'>No connections</p>
            )}

        </div>
    );
}

export default LandingPage;