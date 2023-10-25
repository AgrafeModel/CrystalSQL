import React from 'react';
import {
    Card, CardBody, CardFooter, Button, Modal, ModalBody, ModalHeader, ModalFooter, useDisclosure, ModalContent, Input, Select, SelectItem, Switch, Accordion, AccordionItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    CardHeader
} from '@nextui-org/react';
import {
    faPlug,
    faEdit,
    faBan,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





export default function EditConnectionModal({ originalConnection = {
    port: 3306,
}, connectionList, setConnectionList, isForEdit }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSSH, setIsSSH] = React.useState(originalConnection.sshUsername ? true : false);
    const [error, setError] = React.useState({});
    const [connection, setConnection] = React.useState(originalConnection);
    const [clearValidationOpen, setClearValidationOpen] = React.useState(false);
    const [testResult, setTestResult] = React.useState({});


    const saveConnection = () => {
        setError({});
        //check if connection is valid
        if (connection.name && connection.type && connection.host && connection.port && connection.username && connection.password && connection.database) {
            //save connection
            console.log(connection);
            //if the modal is for edit, update connection
            if (isForEdit) {
                //update connection
                window.ipc.send('update-connection', connection);
                //update connection list
                if (connectionList && setConnectionList) {
                    console.log(connectionList);
                    const newConnectionList = connectionList.filter(connection => connection.id !== originalConnection.id);
                    setConnectionList([...newConnectionList, connection]);
                }
            }
            else {
                //Send to main process
                window.ipc.send('save-connection', connection);
                //add to connection list
                if (connectionList && setConnectionList) {
                    setConnectionList([...connectionList, connection]);
                }
            }
            //close modal
            onOpenChange();
        } else {
            //show error
            setError({ message: "Please fill all fields" });
        }

    }

    const testConnection = () => {
        setError({});
        //check if connection is valid
        if (connection.name && connection.type && connection.host && connection.port && connection.username && connection.password && connection.database) {
            //test connection
            window.ipc.send('test-connection', connection);
        } else {
            //show error
            setError({ message: "Please fill all fields" });
        }
    }

    React.useEffect(() => {
        //when modal closes
        if (!isOpen) {
            //reset test result
            setTestResult({});
            //and error
            setError({});
            //reset connection
            setConnection(originalConnection);
        }
    }, [isOpen])



    React.useEffect(() => {
        window.ipc.on('connection-tested', (event, arg) => {
            console.log(event)
            setTestResult(event)
        })

        window.ipc.on('connection-failed', (event, arg) => {
            console.log(event)
            setTestResult(event)
        })

    }, [])




    const deleteConnection = () => {
        //close modal
        onOpenChange();
        //delete connection
        window.ipc.send('delete-connection', originalConnection.id);
        //delete connection from connection list
        if (connectionList && setConnectionList) {
            const newConnectionList = connectionList.filter(connection => connection.id !== originalConnection.id);
            setConnectionList(newConnectionList);
        }

    }






    return (
        <>
            {isForEdit ? (
                <Button color='primary' variant='flat' auto startContent={<FontAwesomeIcon icon={faEdit} />} isIconOnly onPress={onOpen}></Button>) : (
                <Button onPress={onOpen} color='primary' variant='flat' auto className='rounded-none'>
                    Add
                </Button>)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1" align='center' justify='center' color='primary'>
                        Edit Connection
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-1 items-end">
                                <Input placeholder="Name" width="100%" color='primary' variant='flat' label='Name' labelPlacement='outside' onChange={(e) => setConnection({ ...connection, name: e.target.value })} defaultValue={connection.name} />
                                <Select placeholder="Select" width="100%" color='primary' variant='flat' label='Database Type' labelPlacement='outside' onChange={(e) => setConnection({ ...connection, type: e.target.value })}
                                    selectedKeys={connection.type && connection.type.toString() ? [connection.type.toString()] : []}

                                    defaultValue={connection.type}>

                                    <SelectItem key="mysql" value="mysql">MySQL</SelectItem>
                                    <SelectItem key="mariadb" value="mariadb">MariaDB</SelectItem>
                                    <SelectItem key="postgres" value="postgres">Postgres</SelectItem>
                                    <SelectItem key="mssql" value="mssql">MSSQL</SelectItem>
                                    <SelectItem key="sqlite" value="sqlite">SQLite</SelectItem>
                                    <SelectItem key="oracle" value="oracle">Oracle</SelectItem>

                                </Select>
                                <Switch color='secondary' className='mb-2' onValueChange={setIsSSH} defaultValue={isSSH}>
                                    <p className='text-primary'>SSL</p>
                                </Switch>
                            </div>
                            <div className="flex flex-row gap-1 items-end">
                                <Input placeholder="Host" width="100%" color='primary' variant='flat' label='Server Adress' labelPlacement='outside' onChange={(e) => setConnection({ ...connection, host: e.target.value })} defaultValue={connection.host} />
                                <Input placeholder="Port" width="100%" color='primary' variant='flat' onChange={(e) => setConnection({ ...connection, port: e.target.value })} defaultValue={connection.port || 3306} />
                                <Input placeholder="Domain" width="100%" color='primary' variant='flat' onChange={(e) => setConnection({ ...connection, domain: e.target.value })} defaultValue={connection.domain} />
                                <Input placeholder="Unix Socket Path" width="100%" color='primary' variant='flat' onChange={(e) => setConnection({ ...connection, socketPath: e.target.value })} defaultValue={connection.socketPath} />
                            </div>
                            <div className="flex flex-row gap-1 items-end">
                                <Input placeholder="Username" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Username' onChange={(e) => setConnection({ ...connection, username: e.target.value })} defaultValue={connection.username} />
                                <Input placeholder="Password" width="100%" color='primary' variant='flat' labelPlacement='outside' type='password' label='Password' onChange={(e) => setConnection({ ...connection, password: e.target.value })} defaultValue={connection.password} />
                                <Input placeholder="Database" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Database' onChange={(e) => setConnection({ ...connection, database: e.target.value })} defaultValue={connection.database} />
                            </div>
                            <div className="flex flex-row gap-1 items-end">
                                <Accordion selectedKeys={isSSH ? ['ssh'] : []}
                                    onChange={setIsSSH} multiple={false} className='w-full'>
                                    <AccordionItem title={
                                        <Switch color='secondary' className='mb-2' onValueChange={setIsSSH} defaultValue={isSSH}>
                                            <p className='text-primary'>SSH Tunnel</p>
                                        </Switch>
                                    } key='ssh'>

                                        <div className="flex flex-row gap-1 items-end">
                                            <Input placeholder="Username" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Username' onChange={(e) => setConnection({ ...connection, sshUsername: e.target.value })} defaultValue={connection.sshUsername} />
                                            <Input placeholder="Password" width="100%" color='primary' variant='flat' labelPlacement='outside' type='password' label='Password' onChange={(e) => setConnection({ ...connection, sshPassword: e.target.value })} defaultValue={connection.sshPassword} />
                                            <Input placeholder="Database" width="100%" color='primary' variant='flat' labelPlacement='outside' label='Database' onChange={(e) => setConnection({ ...connection, sshDatabase: e.target.value })} defaultValue={connection.sshDatabase} />
                                        </div>
                                    </AccordionItem>


                                </Accordion>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter className='flex flex-row gap-1 justify-between'>
                        <div className="flex flex-row gap-1 items-end">
                            <Popover placement='bottom' trigger='click' isOpen={clearValidationOpen} onOpenChange={(e) => setClearValidationOpen(e)}>
                                <PopoverTrigger>
                                    <Button color='primary' variant='light' auto startContent={<FontAwesomeIcon icon={faBan} />} onClick={() => setClearValidationOpen(true)}>
                                        Delete
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex flex-row gap-1 items-end">
                                            <p className='text-primary'>Are you sure you want to delete this connection?</p>
                                        </div>
                                        <Button color='primary' auto variant='flat' onClick={() => setClearValidationOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button color='primary' auto onClick={deleteConnection} variant='light'>
                                            Delete
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        </div>
                        <div className="flex flex-row gap-1 items-end">
                            <p className='text-red-500'>{error.message}</p>
                            {testResult.success ? <p className='text-green-500'>{testResult.message}</p> : <p className='text-red-500'>{testResult.message}</p>}
                            <Button color='primary' variant='light' auto startContent={<FontAwesomeIcon icon={faPlug} />} onClick={testConnection}>
                                Test
                            </Button>
                            <Button color='primary' variant='light' auto startContent={<FontAwesomeIcon icon={faBan} />} onClick={onOpenChange}>
                                Cancel
                            </Button>
                            <Button color='primary' variant='flat' auto startContent={<FontAwesomeIcon icon={faPlus} />} onClick={saveConnection}>
                                Save
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

