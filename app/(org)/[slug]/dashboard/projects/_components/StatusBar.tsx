import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "updating" | "success" | "error" | "idle";

interface StatusBarProps {
  status: StatusType;
  message?: string;
}

export default function StatusBar({ status, message }: StatusBarProps) {
  if (status === "idle") return null;
  
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 flex items-center gap-2 rounded-md py-2 px-4 shadow-md transition-all duration-300",
        status === "updating" && "bg-amber-100 text-amber-800",
        status === "success" && "bg-green-100 text-green-800",
        status === "error" && "bg-red-100 text-red-800"
      )}
    >
      {status === "updating" && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === "success" && <CheckCircle className="h-4 w-4" />}
      {status === "error" && <XCircle className="h-4 w-4" />}
      
      <span>
        {message || 
          (status === "updating" 
            ? "Updating..." 
            : status === "success" 
              ? "Task updated successfully" 
              : "Failed to update task")}
      </span>
    </div>
  );
} 