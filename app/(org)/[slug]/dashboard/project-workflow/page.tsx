"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { initialBoards, BoardData } from "./MockData";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Board from "./_components/Board";
import { Task } from "./_components/Board";
import CreateBoardModal from "./_components/CreateBoardModal";
import TaskDetailsModal from "./_components/TaskDetailsModal";

export default function ProjectWorkflowPage() {
  const [boards, setBoards] = useState<BoardData[]>(initialBoards);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Handle drag end event from react-beautiful-dnd
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination boards
    const sourceBoard = boards.find((board) => board.id === source.droppableId);
    const destBoard = boards.find((board) => board.id === destination.droppableId);

    if (!sourceBoard || !destBoard) {
      return;
    }

    // Create a copy of our source tasks
    const sourceTasksCopy = [...sourceBoard.tasks];
    
    // Remove the task from the source
    const [movedTask] = sourceTasksCopy.splice(source.index, 1);

    // Moving to a different board
    if (source.droppableId !== destination.droppableId) {
      // Update the task with the new status
      const updatedTask = {
        ...movedTask,
        status: destBoard.title,
      };

      // Create a copy of our destination tasks
      const destTasksCopy = [...destBoard.tasks];
      
      // Insert the task in the destination
      destTasksCopy.splice(destination.index, 0, updatedTask);

      // Update the boards with the new tasks arrays
      const newBoards = boards.map((board) => {
        if (board.id === source.droppableId) {
          return { ...board, tasks: sourceTasksCopy };
        }
        if (board.id === destination.droppableId) {
          return { ...board, tasks: destTasksCopy };
        }
        return board;
      });

      setBoards(newBoards);
    } else {
      // Moving within the same board
      // Insert the task at the destination
      sourceTasksCopy.splice(destination.index, 0, movedTask);

      // Update the board with the new tasks array
      const newBoards = boards.map((board) => {
        if (board.id === source.droppableId) {
          return { ...board, tasks: sourceTasksCopy };
        }
        return board;
      });

      setBoards(newBoards);
    }
  };

  const handleCreateBoard = (title: string) => {
    const newBoard: BoardData = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      tasks: [],
    };
    setBoards([...boards, newBoard]);
  };

  const handleDeleteBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId));
  };

  const handleAddTask = (boardId: string, task: Task) => {
    const newBoards = boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, tasks: [...board.tasks, task] };
      }
      return board;
    });
    setBoards(newBoards);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const newBoards = boards.map((board) => ({
      ...board,
      tasks: board.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
    setBoards(newBoards);
  };

  // Get board width based on screen size
  const getBoardWidth = () => {
    if (windowWidth < 640) {
      return "100%"; // Full width on mobile
    } else if (windowWidth < 768) {
      return "250px";
    } else if (windowWidth < 1024) {
      return "280px";
    } else {
      return "300px";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Project Workflow Management</h1>
        <Button
          className="bg-nexus-600 hover:bg-nexus-700 w-full sm:w-auto"
          onClick={() => setIsCreateBoardModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Board
        </Button>
      </div>

      <div className="w-full flex flex-col flex-1 overflow-hidden bg-background border rounded-lg">
        <div className="p-4 border-b sticky top-0 bg-background z-10">
          <h2 className="text-xl font-semibold">Project Boards</h2>
        </div>

        <div className="overflow-x-auto flex-1">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 p-4 pb-8 min-w-fit">
              {boards.map((board) => (
                <Board
                  key={board.id}
                  board={board}
                  onTaskClick={setSelectedTask}
                  onAddTask={handleAddTask}
                  onDeleteBoard={handleDeleteBoard}
                  width={getBoardWidth()}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      <CreateBoardModal
        isOpen={isCreateBoardModalOpen}
        onClose={() => setIsCreateBoardModalOpen(false)}
        onSubmit={handleCreateBoard}
      />
      <TaskDetailsModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
}