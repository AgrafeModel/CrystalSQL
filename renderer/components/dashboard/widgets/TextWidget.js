import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent, useDisclosure, Button, Input,Popover,PopoverContent,PopoverTrigger } from '@nextui-org/react';
import { useDashboardContext } from "../../../utils/DashboardManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


export function TextWidget({ widget }) {
    const { isEditing, updateWidget } = useDashboardContext();


    //check if it's the good type of widget
    if (widget.type !== 'text') {
        return null;
    }
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <div className="flex flex-col">
                    <p className="text-lg text-gray-500">
                        {widget.title}
                    </p>
                    <p className="text-xs text-gray-500">{widget.description}</p>
                </div>
            </CardHeader>
            <CardBody className="h-full w-full px-4 pt-0">
                <div className="flex flex-row justify-between">
                    <p className=" text-gray-500">{widget.content}</p>
                </div>
            </CardBody>
            {isEditing && (
                <CardFooter className='w-full h-full'>
                    <div className="flex flex-row justify-between flex-row-reverse h-full w-full">

                        <TextWidgetModal widget={widget} />

                    </div>
                </CardFooter>
            )}
        </Card>
    );
};



/**
 * 
 * @param {*} param0 this parameter is required to get the widget to update. If the widget is new, it should be at least an object with the id of the dashboard
 * @returns a modal to edit the widget
 */
export function TextWidgetModal({ widget, onClose, isNew = false }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setCanItemBeDragged } = useDashboardContext();
    const [currentWidget, setCurrentWidget] = React.useState(widget);
    const { updateWidget, addWidget,deleteWidget } = useDashboardContext();

    const handleOpen = () => {
        setCanItemBeDragged(false);
        onOpen();
    }
    const handleOpenChange = () => {
        setCanItemBeDragged(true);
        onOpenChange();
    }

    const handleSave = () => {

        //Add the type to the widget
        currentWidget.type = 'text';
        if (!isNew) {
            updateWidget(currentWidget);
        }
        else {
            addWidget(currentWidget);
        }
        handleOpenChange();
        if (onClose) { onClose() }
    }

    const handleDelete = () => {
        //close the modal
        handleOpenChange();
        //delete the widget
        deleteWidget(currentWidget);
        //close the modal
        if (onClose) { onClose() }

    }




    //check if their the id of the dashboard
    if (!currentWidget.dashboardId) {
        return null;
    }

    return (
        <>
            {currentWidget && (
                <>
                    {!isNew ? (
                        <Button onPress={handleOpen}
                            isIconOnly color="primary" variant="light" radius='full'>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    ) : (
                        <Button onPress={handleOpen}
                            color="primary" variant="light" radius='full'>
                            Add Text Widget
                        </Button>
                    )}
                    <Modal isOpen={isOpen} onOpenChange={handleOpenChange} >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1"> Text Widget</ModalHeader>
                                    <ModalBody>
                                        <div className="flex flex-col gap-2">
                                            <Input
                                                label="Widget Title"
                                                placeholder="Widget Title"
                                                defaultValue={currentWidget.title}
                                                variant="underlined"
                                                onValueChange={(value) => setCurrentWidget({ ...currentWidget, title: value })}
                                                color="primary"
                                            />
                                            <Input
                                                label="Widget Description"
                                                placeholder="Widget Description"
                                                defaultValue={currentWidget.description}
                                                variant="underlined"
                                                onValueChange={(value) => setCurrentWidget({ ...currentWidget, description: value })}
                                                color="primary"
                                            />
                                            <Input
                                                label="Widget Content"
                                                placeholder="Widget Content"
                                                defaultValue={currentWidget.content}
                                                variant="underlined"
                                                onValueChange={(value) => setCurrentWidget({ ...currentWidget, content: value })}
                                                color="primary"
                                            />
                                            <div className="flex flex-row justify-end items-center">
                                                {/*width and height*/}
                                                <Input
                                                    label="Widget Width"
                                                    placeholder="Widget Width"
                                                    defaultValue={currentWidget.width || 1}
                                                    variant="underlined"
                                                    onValueChange={(value) => setCurrentWidget({ ...currentWidget, width: value })}
                                                    color="primary"
                                                    className="w-1/2"
                                                    type='number'
                                                    min={1}
                                                />
                                                <Input
                                                    label="Widget Height"
                                                    placeholder="Widget Height"
                                                    defaultValue={currentWidget.height || 1}
                                                    variant="underlined"
                                                    onValueChange={(value) => setCurrentWidget({ ...currentWidget, height: value })}
                                                    color="primary"
                                                    className="w-1/2"
                                                    type='number'
                                                    min={1}
                                                />
                                            </div>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <div className="flex flex-row justify-start items-center">
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <Button color="primary" variant="flat">Delete</Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                        <p>Are you sure you want to delete this widget?</p>
                                                        <div className="flex flex-row justify-end items-center">
                                                            <Button color="primary" variant="flat" onClick={handleDelete}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <div className="flex flex-row justify-between items-center">
                                                <Button color="primary" variant="light" onClick={onClose}>Cancel</Button>
                                                <Button color="primary" variant='flat' onClick={handleSave}>Save</Button>
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
}
