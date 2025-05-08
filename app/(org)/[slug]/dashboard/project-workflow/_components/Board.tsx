import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import CreateTaskModal from "./CreateTaskModal";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { BoardData } from "../MockData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BoardProps {
  board: BoardData;
  onTaskClick: (task: Task) => void;
  onAddTask: (boardId: string, task: Task) => void;
  onDeleteBoard: (boardId: string) => void;
  width: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
}

export default function Board({ 
  board,
  onTaskClick, 
  onAddTask, 
  onDeleteBoard,
  width
}: BoardProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const tasksContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="flex flex-col border rounded-lg bg-background"
      style={{ width, flexShrink: 0 }}
    >
      {/* Board Header - Fixed and Responsive */}
      <div className="p-3 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <div className="font-medium truncate">{board.title}</div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{board.tasks.length}</Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCreateTaskModalOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <Droppable droppableId={board.id}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 space-y-2 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto flex-1 ${
              snapshot.isDraggingOver ? 'bg-muted/20' : ''
            }`}
          >
            {board.tasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onTaskClick(task)}
                    className={`p-3 bg-card rounded-lg border shadow-sm transition-all duration-200
                      ${snapshot.isDragging ? "opacity-70 shadow-md" : ""}
                      ${!snapshot.isDragging && "hover:shadow-md hover:translate-y-[-2px]"}
                    `}
                    style={{
                      ...provided.draggableProps.style,
                      cursor: "grab"
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
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {board.tasks.length === 0 && (
              <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                Drop tasks here
              </div>
            )}
          </div>
        )}
      </Droppable>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onSubmit={(task) => {
          onAddTask(board.id, task);
          setIsCreateTaskModalOpen(false);
        }}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Board</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this board? This action cannot be undone.
              All tasks in this board will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDeleteBoard(board.id);
                setIsDeleteDialogOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 