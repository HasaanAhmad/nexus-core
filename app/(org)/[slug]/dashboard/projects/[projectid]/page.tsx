"use client";
import { useState, useCallback, useEffect, useTransition } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Board from "../_components/Board";
import CreateBoardModal from "../_components/CreateBoardModal";
import TaskDetailsModal from "../_components/TaskDetailsModal";
import { BoardData } from "../MockData";
import { Task } from "../_components/Board";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  getProjectById, 
  createBoard, 
  deleteBoard, 
  createTask, 
  updateTask, 
  deleteTask, 
  updateTaskBoard 
} from "@/actions/ProjectActions";
import { Badge } from "@/components/ui/badge";
import { Project } from "@prisma/client";
import { toast } from "sonner";
import StatusBar, { StatusType } from "../_components/StatusBar";

// Status mapping for UI display
const statusToDisplay: Record<string, string> = {
  "PLANNING": "Planning",
  "IN_PROGRESS": "In Progress",
  "COMPLETED": "Completed"
};

const statusToClass: Record<string, string> = {
  "PLANNING": "bg-amber-100 text-amber-800",
  "IN_PROGRESS": "bg-blue-100 text-blue-800",
  "COMPLETED": "bg-green-100 text-green-800"
};

// Map database priority to UI priority
const priorityToDisplay: Record<string, "High" | "Medium" | "Low"> = {
  "HIGH": "High",
  "MEDIUM": "Medium",
  "LOW": "Low"
};

// Map UI priority back to database priority
const priorityToDatabase: Record<string, "HIGH" | "MEDIUM" | "LOW"> = {
  "High": "HIGH",
  "Medium": "MEDIUM",
  "Low": "LOW"
};
// Define the project type with nested boards
interface ProjectWithRelations extends Project {
  description: string | null;
  boards?: BoardWithTasks[];
  assignees?: any[];
}


interface BoardWithTasks {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: any[];
}

const ProjectDetailPage = () => {
  const params = useParams();
  const projectId = params.projectid as string;
  const slug = params.slug as string;
  
  const [project, setProject] = useState<ProjectWithRelations | null>(null);
  const [boards, setBoards] = useState<BoardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  
  // Status tracking
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(projectId);
        
        if ('error' in data) {
          setError(data.error);
          return;
        }
        
        setProject(data as ProjectWithRelations);
        
        // Transform boards data to match the component's expected format
        if (data.boards?.length) {
          const formattedBoards = data.boards.map(board => ({
            id: board.id,
            title: board.name,
            color: board.color || undefined,
            tasks: (board.tasks || []).map(task => ({
              id: task.id,
              title: task.name || "Untitled Task",
              description: task.description || "",
              status: board.name,
              assignee: "Unassigned", // You'll need to map this properly
              priority: priorityToDisplay[task.priority || "MEDIUM"],
              dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : undefined
            }))
          }));
          setBoards(formattedBoards);
        }
      } catch (err) {
        setError("Failed to load project data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);
  
  // Set status with auto-reset after success/error
  const setStatus = (type: StatusType, message?: string) => {
    setStatusType(type);
    setStatusMessage(message);
    
    if (type === "success" || type === "error") {
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setStatusType("idle");
        setStatusMessage(undefined);
      }, 3000);
    }
  };
  
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If dropped outside a droppable area
    if (!destination) return;
    
    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Find source and destination boards
    const sourceBoard = boards.find(board => board.id === source.droppableId);
    const destBoard = boards.find(board => board.id === destination.droppableId);
    
    if (!sourceBoard || !destBoard) return;
    
    // Create a new array of boards
    const newBoards = [...boards];
    
    // Find the task that was moved
    const task = sourceBoard.tasks.find(task => task.id === draggableId);
    if (!task) return;
    
    // Create new task with updated status
    const updatedTask = { ...task, status: destBoard.title };
    
    // Create updated source and destination boards
    const updatedSourceBoard = {
      ...sourceBoard,
      tasks: sourceBoard.tasks.filter(task => task.id !== draggableId)
    };
    
    // If same board, just reorder
    if (source.droppableId === destination.droppableId) {
      const newTasks = [...updatedSourceBoard.tasks];
      newTasks.splice(destination.index, 0, updatedTask);
      updatedSourceBoard.tasks = newTasks;
    } else {
      // If different boards, remove from source and add to destination
      const updatedDestBoard = {
        ...destBoard,
        tasks: [...destBoard.tasks]
      };
      
      updatedDestBoard.tasks.splice(destination.index, 0, updatedTask);
      
      // Update both boards in the boards array
      const sourceIndex = newBoards.findIndex(board => board.id === source.droppableId);
      const destIndex = newBoards.findIndex(board => board.id === destination.droppableId);
      
      newBoards[sourceIndex] = updatedSourceBoard;
      newBoards[destIndex] = updatedDestBoard;
    }
    
    // Optimistically update UI
    setBoards(newBoards);
    
    // Show updating status
    setStatus("updating", "Moving task...");
    
    // Make API call to update task's board
    startTransition(async () => {
      try {
        const result = await updateTaskBoard(draggableId, destination.droppableId);
        
        if ('error' in result) {
          // If error, revert the optimistic update
          setBoards(prevBoards => {
            const sourceBoard = prevBoards.find(board => board.id === source.droppableId);
            const destBoard = prevBoards.find(board => board.id === destination.droppableId);
            
            if (!sourceBoard || !destBoard) return prevBoards;
            
            // Revert the change by moving the task back
            const revertedBoards = [...prevBoards];
            const taskToMove = destBoard.tasks.find(t => t.id === draggableId);
            
            if (!taskToMove) return prevBoards;
            
            // Remove from destination
            const updatedDestBoard = {
              ...destBoard,
              tasks: destBoard.tasks.filter(t => t.id !== draggableId)
            };
            
            // Add back to source
            const updatedSourceBoard = {
              ...sourceBoard,
              tasks: [...sourceBoard.tasks]
            };
            
            updatedSourceBoard.tasks.splice(source.index, 0, taskToMove);
            
            // Update the boards
            const sourceIndex = revertedBoards.findIndex(board => board.id === source.droppableId);
            const destIndex = revertedBoards.findIndex(board => board.id === destination.droppableId);
            
            revertedBoards[sourceIndex] = updatedSourceBoard;
            revertedBoards[destIndex] = updatedDestBoard;
            
            return revertedBoards;
          });
          
          setStatus("error", result.error);
          return;
        }
        
        setStatus("success", "Task moved successfully");
      } catch (error) {
        console.error("Failed to update task board:", error);
        setStatus("error", "Failed to move task");
      }
    });
  }, [boards]);
  
  const handleTaskClick = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  }, []);
  
  const handleUpdateTask = useCallback((updatedTask: Task) => {
    // Optimistically update UI
    setBoards(prevBoards => {
      return prevBoards.map(board => {
        const taskIndex = board.tasks.findIndex(t => t.id === updatedTask.id);
        if (taskIndex === -1) return board;
        
        const newTasks = [...board.tasks];
        newTasks[taskIndex] = updatedTask;
        
        return { ...board, tasks: newTasks };
      });
    });
    
    setIsTaskDetailsOpen(false);
    setStatus("updating", "Updating task...");
    
    // Make API call to update task
    startTransition(async () => {
      try {
        // Convert UI priority to database priority
        const dbPriority = priorityToDatabase[updatedTask.priority];
        
        const result = await updateTask({
          id: updatedTask.id,
          name: updatedTask.title,
          description: updatedTask.description,
          priority: dbPriority,
          dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : undefined
        });
        
        if ('error' in result) {
          setStatus("error", result.error);
          return;
        }
        
        setStatus("success", "Task updated successfully");
      } catch (error) {
        console.error("Failed to update task:", error);
        setStatus("error", "Failed to update task");
      }
    });
  }, []);
  
  const handleDeleteTask = useCallback((taskId: string) => {
    // Optimistically update UI
    setBoards(prevBoards => {
      return prevBoards.map(board => ({
        ...board,
        tasks: board.tasks.filter(t => t.id !== taskId)
      }));
    });
    
    setIsTaskDetailsOpen(false);
    setStatus("updating", "Deleting task...");
    
    // Make API call to delete task
    startTransition(async () => {
      try {
        const result = await deleteTask(taskId);
        
        if ('error' in result) {
          // TODO: Implement optimistic UI rollback if needed
          setStatus("error", result.error);
          return;
        }
        
        setStatus("success", "Task deleted successfully");
      } catch (error) {
        console.error("Failed to delete task:", error);
        setStatus("error", "Failed to delete task");
      }
    });
  }, []);
  
  const handleAddTask = useCallback((boardId: string, task: Task) => {
    // Generate a temporary ID for optimistic updates
    const tempId = `temp-${Date.now()}`;
    const newTask = { ...task, id: tempId };
    
    // Optimistically update UI
    setBoards(prevBoards => {
      return prevBoards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          tasks: [...board.tasks, { ...newTask, status: board.title }]
        };
      });
    });
    
    setStatus("updating", "Creating task...");
    
    // Make API call to create task
    startTransition(async () => {
      try {
        // Convert UI priority to database priority
        const dbPriority = priorityToDatabase[task.priority];
        
        const result = await createTask({
          name: task.title,
          description: task.description,
          boardId: boardId,
          priority: dbPriority,
          assigneeId: project?.assignees?.length ? project.assignees[0].id : "", // Default to first assignee or current user
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        });
        
        if ('error' in result) {
          // Remove the temporary task from the UI
          setBoards(prevBoards => {
            return prevBoards.map(board => {
              if (board.id !== boardId) return board;
              return {
                ...board,
                tasks: board.tasks.filter(t => t.id !== tempId)
              };
            });
          });
          
          setStatus("error", result.error);
          return;
        }
        
        // Replace the temporary task with the real one from the server
        setBoards(prevBoards => {
          return prevBoards.map(board => {
            if (board.id !== boardId) return board;
            
            const newTasks = [...board.tasks];
            const tempTaskIndex = newTasks.findIndex(t => t.id === tempId);
            
            if (tempTaskIndex !== -1) {
              newTasks[tempTaskIndex] = {
                id: result.id,
                title: result.name,
                description: result.description || "",
                status: board.title,
                assignee: "Unassigned", // This should be mapped properly
                priority: priorityToDisplay[result.priority],
                dueDate: result.dueDate ? new Date(result.dueDate).toISOString().split('T')[0] : undefined
              };
            }
            
            return { ...board, tasks: newTasks };
          });
        });
        
        setStatus("success", "Task created successfully");
      } catch (error) {
        console.error("Failed to create task:", error);
        setStatus("error", "Failed to create task");
      }
    });
  }, [project]);
  
  const handleCreateBoard = useCallback(async (title: string, color: string) => {
    try {
      setStatus("updating", "Creating board...");
      
      const result = await createBoard({
        name: title,
        projectId: projectId,
        color: color
      });
      
      if ('error' in result) {
        setStatus("error", result.error);
        return;
      }
      
      // Add the new board to the UI
      const newBoard: BoardData = {
        id: result.id,
        title: result.name,
        color: result.color || undefined,
        tasks: []
      };
      
      setBoards(prevBoards => [...prevBoards, newBoard]);
      setIsCreateBoardOpen(false);
      setStatus("success", "Board created successfully");
    } catch (error) {
      console.error("Error creating board:", error);
      setStatus("error", "Failed to create board");
    }
  }, [projectId]);
  
  const handleDeleteBoard = useCallback(async (boardId: string) => {
    try {
      setStatus("updating", "Deleting board...");
      
      const result = await deleteBoard(boardId);
      
      if ('error' in result) {
        setStatus("error", result.error);
        return;
      }
      
      // Remove the board from the UI
      setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
      setStatus("success", "Board deleted successfully");
    } catch (error) {
      console.error("Error deleting board:", error);
      setStatus("error", "Failed to delete board");
    }
  }, []);
  
  const boardWidth = boards.length <= 2 ? "100%" : 
                     boards.length === 3 ? "33%" : "300px";

  if (loading) {
    return <div className="flex justify-center p-8">Loading project data...</div>;
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <Link href={`/${slug}/dashboard/projects`}>
          <Button>Return to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href={`/${slug}/dashboard/projects`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{project?.name}</h1>
          {project?.status && (
            <Badge 
              variant="outline" 
              className={statusToClass[project.status]}
            >
              {statusToDisplay[project.status]}
            </Badge>
          )}
        </div>
        <Button onClick={() => setIsCreateBoardOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Board
        </Button>
      </div>
      
      <div className="mb-2 text-sm text-muted-foreground">
        {project?.description}
      </div>
      
      {project?.dueDate && (
        <div className="text-sm text-muted-foreground">
          Due: {new Date(project.dueDate).toLocaleDateString()}
        </div>
      )}
      
      <div className="mt-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {boards.map(board => (
              <Board 
                key={board.id}
                board={board}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
                onDeleteBoard={handleDeleteBoard}
                width={boardWidth}
              />
            ))}
            {boards.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full p-8 border rounded-lg">
                <p className="text-muted-foreground mb-4">No boards yet</p>
                <Button onClick={() => setIsCreateBoardOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create First Board
                </Button>
              </div>
            )}
          </div>
        </DragDropContext>
      </div>
      
      {selectedTask && (
        <TaskDetailsModal 
          isOpen={isTaskDetailsOpen}
          onClose={() => setIsTaskDetailsOpen(false)}
          task={selectedTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
      
      <CreateBoardModal
        isOpen={isCreateBoardOpen}
        onClose={() => setIsCreateBoardOpen(false)}
        onSubmit={handleCreateBoard}
      />
      
      <StatusBar status={statusType} message={statusMessage} />
    </div>
  );
};

export default ProjectDetailPage;
