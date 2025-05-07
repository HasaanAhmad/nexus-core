"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board, { Task } from "./_components/Board";
import CreateBoardModal from "./_components/CreateBoardModal";
import TaskDetailsModal from "./_components/TaskDetailsModal";
import { useState, useRef, useEffect } from "react";
import { initialBoards, BoardData } from "./MockData";

// Custom HTML5Backend with auto-scrolling
const customBackend = HTML5Backend;

export default function ProjectWorkflowPage() {
  const [boards, setBoards] = useState<BoardData[]>(initialBoards);
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Add auto-scrolling effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Function to handle mouse movement for auto-scrolling
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const rect = container.getBoundingClientRect();
      const scrollThreshold = 100; // pixels from edge
      const scrollSpeed = 15;

      // Calculate distance from edges
      const distanceFromLeft = clientX - rect.left;
      const distanceFromRight = rect.right - clientX;
      
      // Auto-scroll when near the edges during drag operations
      if (e.buttons === 1) { // Check if mouse button is pressed (dragging)
        // Scroll left if near left edge
        if (distanceFromLeft < scrollThreshold) {
          container.scrollLeft -= scrollSpeed;
        }
        // Scroll right if near right edge
        else if (distanceFromRight < scrollThreshold) {
          container.scrollLeft += scrollSpeed;
        }
      }
    };

    // Function for touch-based scrolling
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      const { clientX } = touch;
      const rect = container.getBoundingClientRect();
      const scrollThreshold = 80;
      const scrollSpeed = 10;

      // Calculate distance from edges
      const distanceFromLeft = clientX - rect.left;
      const distanceFromRight = rect.right - clientX;
      
      // Auto-scroll when near the edges during touch drag
      if (distanceFromLeft < scrollThreshold) {
        container.scrollLeft -= scrollSpeed;
      } else if (distanceFromRight < scrollThreshold) {
        container.scrollLeft += scrollSpeed;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const moveTask = (taskId: string, sourceId: string, destinationId: string, index: number) => {
    // Find the source board
    const sourceBoard = boards.find((board) => board.id === sourceId);
    if (!sourceBoard) return;

    // Find the task in the source board
    const taskIndex = sourceBoard.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    // Get the task
    const task = sourceBoard.tasks[taskIndex];

    // Create new board states
    const newBoards = boards.map((board) => {
      // Remove from source board
      if (board.id === sourceId) {
        const newTasks = [...board.tasks];
        newTasks.splice(taskIndex, 1);
        return { ...board, tasks: newTasks };
      }
      
      // Add to destination board
      if (board.id === destinationId) {
        const newTasks = [...board.tasks];
        newTasks.splice(index, 0, task);
        return { ...board, tasks: newTasks };
      }
      
      return board;
    });
    
    setBoards(newBoards);
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

      <Card className="w-full flex flex-col flex-1 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Project Boards</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-hidden flex-1">
          <DndProvider backend={HTML5Backend}>
            <div className="h-full overflow-x-auto" ref={scrollContainerRef}>
              <div className="flex gap-4 min-w-fit p-4 pb-8">
                {boards.map((board) => (
                  <Board
                    key={board.id}
                    id={board.id}
                    title={board.title}
                    tasks={board.tasks}
                    onTaskClick={setSelectedTask}
                    onAddTask={handleAddTask}
                    onDeleteBoard={handleDeleteBoard}
                    onMoveTask={moveTask}
                  />
                ))}
              </div>
            </div>
          </DndProvider>
        </CardContent>
      </Card>

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