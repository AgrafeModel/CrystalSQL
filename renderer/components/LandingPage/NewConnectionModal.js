import React from 'react';
import { Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure, Button, Select, SelectItem, Switch, Accordion, AccordionItem } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBan,
    faPlug,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";




function NewConnectionModal({connectionList, setConnectionList}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSSH, setIsSSH] = React.useState(false);
    const [connection, setConnection] = React.useState({});
    const [error, setError] = React.useState({});



    const saveConnection = () => {
        setError({});
        //check if connection is valid
        if (connection.name && connection.type && connection.host && connection.port && connection.username && connection.password && connection.database) {
            //save connection
            console.log(connection);

            //Send to main process
            window.ipc.send('save-connection', connection);
            //add to connection list
            if(connectionList && setConnectionList){
                setConnectionList([...connectionList, connection]);
            }
            //close modal
            onOpenChange();

        } else {
            //show error
            setError({ message: "Please fill all fields" });
        }

    }

    const testConnection = () => {
        console.log(connection);
    }




    return (
        <>
            <Button onPress={onOpen} color='primary' variant='flat' auto className='rounded-l-none'>
                Add
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}  size='3xl'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1" align='center' justify='center' color='primary'>
                        New Connection
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-1 items-end">
                                <Input placeholder="Name" width="100%" color='primary' variant='flat' label='Name' labelPlacement='outside' onChange={(e) => setConnection({ ...connection, name: e.target.value })} />
                                <Select placeholder="Select" width="100%" color='primary' variant='flat' label='Database Type' labelPlacement='outside' onChange={(e) => setConnection({ ...connection, type: e.target.value })} defaultValue={connection.type}>
                                    <SelectItem key="mysql" value="mysql">MySQL</SelectItem>
                                    <SelectItem key="postgres" value="postgres">Postgres</SelectItem>
                                    <SelectItem key="mssql" value="mssql">MSSQL</SelectItem>
                                </Select>
                                <Switch color='secondary' className='mb-2' onValueChange={setIsSSH}>
                                    <p className='text-primary'>SSL</p>
                                </Switch>
                            </div>
                            <div className="flex flex-row gap-1 items-end">
                                <Input placeholder="Host" width="100%" color='primary' variant='flat' label='Server Adress' labelPlacement='outside' onChange={(e) => setConnection({ ...connection, host: e.target.value })} />
                                <Input placeholder="Port" width="100%" color='primary' variant='flat' onChange={(e) => setConnection({ ...connection, port: e.target.value })} />
                                <Input placeholder="Domain" width="100%" color='primary' variant='flat' onChange={(e) => setConnection({ ...connection, domain: e.target.value })} />
                                <Input placeholder="Unix Socket Path" width="100%" color='primary' variant='flat' onChange={(e) => setConnection({ ...connection, socketPath: e.target.value })} />
                            </div>
                            <div className="flex flex-row gap-1 items-end">
                                <Input placeholder="Username" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Username' onChange={(e) => setConnection({ ...connection, username: e.target.value })} />
                                <Input placeholder="Password" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Password' onChange={(e) => setConnection({ ...connection, password: e.target.value })} />
                                <Input placeholder="Database" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Database' onChange={(e) => setConnection({ ...connection, database: e.target.value })} />
                            </div>
                            <div className="flex flex-row gap-1 items-end">
                                <Accordion selectedKeys={isSSH ? ['ssh'] : []}
                                    onChange={setIsSSH} multiple={false} className='w-full'>
                                    <AccordionItem title={
                                        <Switch color='secondary' className='mb-2' onValueChange={setIsSSH}>
                                            <p className='text-primary'>SSH Tunnel</p>
                                        </Switch>
                                    } key='ssh'>

                                        <div className="flex flex-row gap-1 items-end">
                                            <Input placeholder="Username" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Username' onChange={(e) => setConnection({ ...connection, sshUsername: e.target.value })} />
                                            <Input placeholder="Password" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Password' onChange={(e) => setConnection({ ...connection, sshPassword: e.target.value })} />
                                            <Input placeholder="Database" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Database' onChange={(e) => setConnection({ ...connection, sshDatabase: e.target.value })} />
                                        </div>
                                    </AccordionItem>


                                </Accordion>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <p className='text-red-500'>{error.message}</p>
                        <Button color='primary' variant='light' auto startContent={<FontAwesomeIcon icon={faPlug} />} onClick={testConnection}>
                            Test
                        </Button>
                        <Button color='primary' variant='light' auto startContent={<FontAwesomeIcon icon={faBan} />} onClick={onOpenChange}>
                            Cancel
                        </Button>
                        <Button color='primary' variant='flat' auto startContent={<FontAwesomeIcon icon={faPlus} />} onClick={saveConnection}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

export default NewConnectionModal;