import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { useState, useRef } from "react";
import CreateTaskModal from "./CreateTaskModal";
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
  id: string;
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: (boardId: string, task: Task) => void;
  onDeleteBoard: (boardId: string) => void;
  onMoveTask: (taskId: string, sourceId: string, destinationId: string, index: number) => void;
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

export interface DragItem {
  type: string;
  id: string;
  boardId: string;
  index: number;
}

export default function Board({ 
  id, 
  title, 
  tasks, 
  onTaskClick, 
  onAddTask, 
  onDeleteBoard,
  onMoveTask
}: BoardProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    hover(item: DragItem, monitor) {
      // If the board is empty or the item is being dragged over its own board
      if (tasks.length === 0 || item.boardId === id) {
        return;
      }
    },
    drop(item: DragItem) {
      // If dropping on a different board
      if (item.boardId !== id) {
        onMoveTask(item.id, item.boardId, id, tasks.length);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  // Apply the drop ref to our ref
  drop(boardRef);

  return (
    <Card className={`w-full sm:w-[250px] md:w-[280px] lg:w-[300px] flex-shrink-0 ${isOver ? 'ring-2 ring-primary/50' : ''}`}>
      <CardHeader className="pb-2 bg-muted/20">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md truncate">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{tasks.length}</Badge>
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
      </CardHeader>
      <CardContent className="p-2">
        <div 
          ref={boardRef}
          className="space-y-2 mt-2 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto"
        >
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              boardId={id}
              onClick={() => onTaskClick(task)}
              onMoveTask={onMoveTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
              Drop tasks here
            </div>
          )}
        </div>
      </CardContent>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onSubmit={(task) => {
          onAddTask(id, task);
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
                onDeleteBoard(id);
                setIsDeleteDialogOpen(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
} 