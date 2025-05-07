import { Task } from "./_components/Board";

export interface BoardData {
  id: string;
  title: string;
  tasks: Task[];
}

export const initialBoards: BoardData[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Design homepage wireframes",
        description: "Create wireframes for the homepage layout",
        status: "To Do",
        assignee: "Jane Smith",
        priority: "High",
      },
      {
        id: "2",
        title: "Write user guides",
        description: "Document user guides for the application",
        status: "To Do",
        assignee: "Sarah Thompson",
        priority: "Low",
      },
      {
        id: "6",
        title: "Set up CI/CD pipeline",
        description: "Configure continuous integration and deployment",
        status: "To Do",
        assignee: "Alex Brown",
        priority: "Medium",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Implement user authentication",
        description: "Set up user authentication system",
        status: "In Progress",
        assignee: "Robert Johnson",
        priority: "High",
      },
      {
        id: "4",
        title: "Fix responsive layout issues",
        description: "Fix mobile responsiveness issues",
        status: "In Progress",
        assignee: "Michael Wilson",
        priority: "High",
      },
      {
        id: "7",
        title: "Integrate payment gateway",
        description: "Add Stripe payment integration",
        status: "In Progress",
        assignee: "Linda Lee",
        priority: "Medium",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    tasks: [
      {
        id: "5",
        title: "Create API documentation",
        description: "Document all API endpoints",
        status: "Completed",
        assignee: "Emily Davis",
        priority: "Medium",
      },
      {
        id: "8",
        title: "Launch marketing campaign",
        description: "Start the Q2 marketing campaign",
        status: "Completed",
        assignee: "Chris Green",
        priority: "High",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "9",
        title: "Review project requirements",
        description: "Go through the project requirements with the client",
        status: "Review",
        assignee: "Nina Patel",
        priority: "Medium",
      },
    ],
  },
]; 