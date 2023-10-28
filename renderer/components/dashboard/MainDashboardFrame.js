import React from "react";
import {
    Spinner,
} from "@nextui-org/react";
import {
    DndContext,
    closestCenter,
    MouseSensor,
    DragOverlay,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Popover, PopoverContent, PopoverTrigger, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { SortableWidget } from "./widgets/SortableWidget";
import { deleteDashboard,updateDashboard,useDashboardContext } from "../../utils/DashboardManager";
import NewWidgetModal from "./widgets/NewWidgetModal";

export default function MainDashboardFrame({ dashboard, setDashboard }) {
    const sensors = useSensors(useSensor(MouseSensor));
    const [activeId, setActiveId] = React.useState(null);
    const {isEditing,setIsEditing} = useDashboardContext();

    const handleDragStart = React.useCallback((event) => {
        const { active } = event;
        setActiveId(active.id);
    }, []);

    const handleDragEnd = React.useCallback((event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setDashboard((dashboard) => {
                const oldIndex = dashboard.widgets.findIndex(
                    (widget) => widget.id === active.id
                );
                const newIndex = dashboard.widgets.findIndex(
                    (widget) => widget.id === over.id
                );
                return {
                    ...dashboard,
                    widgets: arrayMove(dashboard.widgets, oldIndex, newIndex),
                };
            });
        }
        setActiveId(null);
    }, []);

    const handleDragCancel = React.useCallback(() => {
        setActiveId(null);
    }, []);

    const toggleEditing = () => {
        if (isEditing) {
            updateDashboard(dashboard);
        }
        setIsEditing(!isEditing);
    };


    return (
        <>
            {dashboard ? (
                <div className="flex flex-col h-full p-4">
                    <div className="flex flex-row justify-between items-center mb-4">
                        <div className="flex flex-col justify-start items-start mr-4 w-full">
                            {!isEditing ? (
                                <div className="flex flex-col justify-start items-start gap-2">
                                    <h1 className="text-2xl font-bold">{dashboard.title}</h1>
                                    <p className="text-sm text-gray-500">{dashboard.description}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-start items-start w-full gap-2">
                                    <Input
                                        placeholder="Dashboard Title"
                                        defaultValue={dashboard.title}
                                        variant="underlined"
                                        onValueChange={ (value) => setDashboard({ ...dashboard, title: value }) }
                                        color="primary"
                                        className="w-1/2"
                                    />
                                    <Input
                                        placeholder="Dashboard Description"
                                        defaultValue={dashboard.description}
                                        variant="underlined"
                                        onValueChange={ (value) => setDashboard({ ...dashboard, description: value }) }
                                        color="primary"
                                        className="w-1/2"
                                    />
                                </div>
                            )}

                        </div>
                        <div className="flex flex-row justify-end items-center gap-2">
                            <NewWidgetModal dashboard={dashboard} />
                            <Button
                                variant={isEditing ? "solid" : "flat"}
                                color="primary"
                                onClick={() => toggleEditing()}
                                isIconOnly
                            >
                                {isEditing ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faEdit} />}
                            </Button>
                        </div>
                    </div>
                    <div className="h-full w-full">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <SortableContext
                                items={dashboard.widgets.map((widget) => widget.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div
                                    className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4"
                                >
                                    {dashboard.widgets.map((widget) => (
                                        <>
                                        {widget.id &&
                                        <SortableWidget
                                            key={widget.id}
                                            id={widget.id}
                                            widget={widget}
                                        />}
                                        </>
                                    ))}
                                </div>
                            </SortableContext>
                            <DragOverlay style={{ transformOrigin: "0 0 " }}>
                                {activeId ? (
                                    <SortableWidget
                                        id={activeId}
                                        widget={dashboard.widgets.find(
                                            (widget) => widget.id === activeId
                                        )}
                                    />
                                ) : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                    <div className="flex flex-row justify-end items-center mt-4">
                        <Popover
                            placement="bottom"
                            trigger="click"
                        >
                            <PopoverTrigger>
                                <Button
                                    color="primary"
                                    variant="flat"
                                >
                                    Delete
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-sm text-gray-500">Are you sure you want to delete this dashboard?</p>
                                    <div className="flex flex-row justify-center items-center mt-4 gap-2">
                                        <Button
                                            color="primary"
                                            variant="flat"
                                            onClick={() => deleteDashboard(dashboard.id)}
                                        >
                                            Confirm
                                        </Button>

                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>


                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <Spinner color="primary" />
                </div>
            )}
        </>
    );
}
