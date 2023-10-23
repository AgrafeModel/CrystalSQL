import React from 'react';
import { Input, Modal, ModalBody, Image, ModalContent, ModalHeader, ModalFooter, useDisclosure, Button, Select, SelectItem, Switch, Accordion, AccordionItem, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faBan,
    faPlug,
    faPlus,
    faEdit
} from "@fortawesome/free-solid-svg-icons";

//import all file in this folder
import NewConnectionModal  from './NewConnectionModal';
import ConnectionCard  from './ConnectionCard';



function ConnectionList({ connections }) {



    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {connections && Object.values(connections).map((connection, index) => (
                    <ConnectionCard key={index} connection={connection} />
                ))}
            </div>
        </>
    );
}



function SearchBar({ connectionList, setConnectionList }) {
    return (
        <>
            <div className="flex justify-center flex-row">
                <Input placeholder="Search" width="100%" color='secondary' variant='faded' radius='none'  />
                <NewConnectionModal connectionList={connectionList} setConnectionList={setConnectionList} />
            </div>
        </>
    );
}


function LandingPage() {
    const [connections, setConnections] = React.useState({});

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
            <SearchBar connectionList={connections} setConnectionList={setConnections} />
            <ConnectionList connections={connections} />

        </div>
    );
}

export default LandingPage;