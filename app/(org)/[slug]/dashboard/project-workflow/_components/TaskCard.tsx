  import { Card } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Task } from "./Board";
  import { Draggable } from "@hello-pangea/dnd";

  interface TaskCardProps {
    task: Task;
    boardId: string;
    onClick: () => void;
    isOverlay?: boolean;
    index: number;
  }

  export default function TaskCard({ task, boardId, onClick, isOverlay = false, index }: TaskCardProps) {
    return (
      <Draggable draggableId={`${task.id}:${boardId}`} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`
              p-3 
              bg-card 
              rounded-lg 
              border 
              shadow-sm 
              transition-all 
              duration-200
              ${snapshot.isDragging ? "opacity-50 scale-95" : ""}
              ${!snapshot.isDragging && !isOverlay && "hover:shadow-md hover:translate-y-[-2px]"}
            `}
            onClick={(e) => {
              if (!snapshot.isDragging) {
                onClick();
              }
            }}
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
        )}
      </Draggable>
    );
  }