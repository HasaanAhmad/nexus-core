import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDrag, useDrop } from "react-dnd";
import { Task, DragItem } from "./Board";
import { useRef } from "react";

interface TaskCardProps {
  task: Task;
  index: number;
  boardId: string;
  onClick: () => void;
  onMoveTask: (taskId: string, sourceId: string, destinationId: string, index: number) => void;
}

export default function TaskCard({ task, index, boardId, onClick, onMoveTask }: TaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Set up the drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { 
      type: 'TASK',
      id: task.id, 
      boardId, 
      index 
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  
  // Set up the drop target for reordering within the same board
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex && item.boardId === boardId) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downward, only move when the cursor is below 50%
      // When dragging upward, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      if (item.boardId === boardId) {
        onMoveTask(item.id, item.boardId, boardId, hoverIndex);
        // Update the index for the dragged item
        item.index = hoverIndex;
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });
  
  // Connect the drag and drop refs
  drag(drop(ref));
  
  // Calculate styles based on drag state
  const cardStyle = `
    p-3 
    bg-card 
    rounded-lg 
    border 
    shadow-sm 
    cursor-pointer 
    transition-all 
    duration-200
    ${isDragging ? "opacity-50 scale-95" : ""}
    ${isOver ? "border-primary" : ""}
    ${!isDragging && "hover:shadow-md hover:translate-y-[-2px]"}
  `;
  
  return (
    <Card
      ref={ref}
      className={cardStyle}
      onClick={onClick}
    >
      <div className="font-medium mb-1 break-words">{task.title}</div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="truncate max-w-[120px]">{task.assignee}</span>
        <Badge
          variant="outline"
          className={
            task.priority === "High"
              ? "bg-red-100 text-red-800 border-red-200"
              : task.priority === "Medium"
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-green-100 text-green-800 border-green-200"
          }
        >
          {task.priority}
        </Badge>
      </div>
    </Card>
  );
} 