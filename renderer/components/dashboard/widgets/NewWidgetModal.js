import React from "react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    useDisclosure,
    Button,
    Input,
} from "@nextui-org/react";
import { useDashboardContext } from "../../../utils/DashboardManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { TextWidgetModal } from "./TextWidget";

export default function NewWidgetModal({ dashboard }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { setCanItemBeDragged, setIsEditing } = useDashboardContext();
    const { addWidget } = useDashboardContext();

    //on open, we disable the drag and drop
    const handleOpen = () => {
        onOpen();
    };

    const handleClose = () => {
        onOpenChange();
    };

    return (
        <>
            <Button onClick={handleOpen} isIconOnly color="primary" variant="flat">
                <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>Add a new widget</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col space-y-2">
                            <TextWidgetModal
                                widget={{ dashboardId: dashboard.id }}
                                onClose={handleClose}
                                isNew
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose} color="primary" variant="flat">
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
