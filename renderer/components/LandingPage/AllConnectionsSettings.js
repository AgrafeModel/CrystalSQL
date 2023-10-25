import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure, Button, Card, CardHeader, CardBody, CardFooter, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";



export default function SettingsModal({ connectionList, setConnectionList }) {

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
    
    return (
        <>
            <Button onPress={onOpen} color='primary' variant='flat' auto className='rounded-l-none'>
                Settings
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='3xl'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1" align='center' justify='center' color='primary'>
                        Settings
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-1 items-end">
                                <Popover placement='bottom' trigger='click' isOpen={clearValidationOpen} onOpenChange={(e) => setClearValidationOpen(e)}>
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
