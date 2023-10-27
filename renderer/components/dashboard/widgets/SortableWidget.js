import { useSortable } from '@dnd-kit/sortable';
import {TextWidget}  from './TextWidget';
import { useDashboardContext } from '../../../utils/DashboardManager';


export function SortableWidget({ id, widget }) {

    const {canItemBeDragged,isEditing} = useDashboardContext();

    //if both are true, the widget can be dragged
    const disabled = !canItemBeDragged || !isEditing;
   
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id, disabled: disabled });

    //based on widget width and height, calculate the grid span
    const gridSpan = (width, height) => {
        return `span ${height} / span ${width}`;
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                opacity: isDragging ? 0 : 1,
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                transition,
                gridArea: gridSpan(widget.width, widget.height),
            }}
            className="h-full w-full"
        >
            {getWidget(widget)}
        </div>
    );
}



    //based on widget type, return the corresponding widget
export const getWidget = (widget) => {
        switch (widget.type) {
            case "text":
                return <TextWidget widget={widget} />;
            default:
                return <TextWidget widget={widget} />;
        }
    };