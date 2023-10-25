import React from 'react';
import { Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure, Button, Card, CardHeader, CardBody, CardFooter,Popover,PopoverTrigger,PopoverContent } from "@nextui-org/react";
import ConnectionCard  from './ConnectionCard';
import EditConnectionModal from './EditConnectionModal';



function ConnectionList({ connections, setConnectionList, connectionList, filter }) {
    const [connectionsDisplay, setConnectionsDisplay] = React.useState(connections);

    const search = (e) => {
        console.log(e.target.value);
        //filter connections
        const filteredConnections = Object.values(connections).filter(connection => connection.name.includes(e.target.value));
        console.log(filteredConnections);
        setConnectionsDisplay(filteredConnections);
    }

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
            console.log(filteredConnections);


            setConnectionsDisplay(filteredConnections);


        }
        else{
            setConnectionsDisplay(connections);
        }

        
    },[filter]);



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {connectionsDisplay && Object.values(connectionsDisplay).map((connection, index) => (
                    <ConnectionCard key={index} connection={connection} connectionList={connectionList} setConnectionList={setConnectionList} />
                ))}
            </div>
        </>
    );
}



function SearchBar({ connectionList, setConnectionList,setFilter }) {



    
    return (
        <>
            <div className="flex justify-center flex-row">
                <Input placeholder="Search" width="100%" color='primary' variant='faded' radius='none' onChange={(e) => setFilter(e.target.value)} />
                <EditConnectionModal connectionList={connectionList} setConnectionList={setConnectionList} />
                <SettingsModal connectionList={connectionList} setConnectionList={setConnectionList} />
            </div>
        </>
    );
}

function SettingsModal({ connectionList, setConnectionList }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [error, setError] = React.useState({});
    const [clearValidationOpen, setClearValidationOpen] = React.useState(false);


    const clearConnections = () => {
        //clear connections
        window.ipc.send('clear-connections', 'clear-connections');
        //clear connection list
        if (connectionList && setConnectionList) {
            setConnectionList([]);
        }

    }

    React.useEffect(() => {
        console.log(clearValidationOpen);
    }
        , [clearValidationOpen]);





    return (
        <>
            <Button onPress={onOpen} color='primary' variant='flat' auto className='rounded-l-none'>
                Settings
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}  size='3xl'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1" align='center' justify='center' color='primary'>
                        Settings
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-1 items-end">
                                <Popover placement='bottom' trigger='click' isOpen={clearValidationOpen} onOpenChange={(e)=>setClearValidationOpen(e)}>
                                    <PopoverTrigger>
                                <Button color='primary' variant='flat' auto>
                                    Clear All Connections
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Card>
                                        <CardHeader>Clear Connections</CardHeader>
                                        <CardBody>
                                            Are you sure you want to clear all connections?

                                        </CardBody>
                                        <CardFooter className='flex flex-row gap-2 justify-between'>
                                            <Button color='primary' auto variant='flat' onClick={() => setClearValidationOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color='primary' auto onClick={clearConnections} variant='light'>
                                                Clear
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}


function LandingPage() {
    const [connections, setConnections] = React.useState({});
    const [filter, setFilter] = React.useState('');
    React.useEffect(() => {
        window.ipc.on('connections', (event, arg) => {
            console.log(event, arg);
            setConnections(event);
        });
        window.ipc.send('get-connections', 'get-connections');
    }
        , []);

    return (
        <div className="flex flex-col gap-4">
            <SearchBar connectionList={connections} setConnectionList={setConnections} initialConnectionList={connections} setFilter={setFilter} />
            <ConnectionList connections={connections} setConnectionList={setConnections} connectionList={connections} filter={filter} />

        </div>
    );
}

export default LandingPage;