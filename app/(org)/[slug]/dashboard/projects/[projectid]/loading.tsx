import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";

export default function Loading() {
  // Create 3 board skeletons
  const boardSkeletons = Array.from({ length: 3 }).map((_, i) => (
    <BoardSkeleton key={i} />
  ));

  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Button disabled>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Board
        </Button>
      </div>
      
      {/* Description skeleton */}
      <Skeleton className="h-4 w-full max-w-xl" />
      
      {/* Due date skeleton */}
      <Skeleton className="h-4 w-32" />
      
      {/* Boards loading skeleton */}
      <div className="mt-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {boardSkeletons}
        </div>
      </div>
    </div>
  );
}

// Board skeleton component
function BoardSkeleton() {
  return (
    <div 
      className="flex flex-col border rounded-lg bg-background overflow-hidden"
      style={{ width: "300px", flexShrink: 0, borderTopWidth: '3px' }}
    >
      {/* Board header skeleton */}
      <div className="p-3 border-b sticky top-0 bg-background z-10">
        <div className="flex justify-between items-center">
          <div className="font-medium truncate flex items-center gap-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-6" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>

      {/* Board content skeleton */}
      <div className="p-3 space-y-2 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto flex-1">
        {/* Generate 3-5 task skeletons per board */}
        {Array.from({ length: Math.floor(Math.random() * 3) + 3 }).map((_, i) => (
          <div 
            key={i}
            className="p-3 bg-card rounded-lg border shadow-sm"
          >
            <Skeleton className="h-5 w-full mb-2" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            {Math.random() > 0.5 && (
              <Skeleton className="h-3 w-24 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 