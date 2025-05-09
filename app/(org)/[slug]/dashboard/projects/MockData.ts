import { Task } from "./_components/Board";

export interface ProjectData {
  id: string;
  name: string;
  client: string;
  status: "In Progress" | "Planning" | "Completed";
  progress: number;
  dueDate: string;
  members: number;
  description?: string;
}

export interface BoardData {
  id: string;
  title: string;
  tasks: Task[];
  color?: string;
}

export const projects: ProjectData[] = [
  { 
    id: "p1", 
    name: "Website Redesign", 
    client: "Acme Corp", 
    status: "In Progress", 
    progress: 65, 
    dueDate: "2025-05-15",
    members: 4,
    description: "Complete redesign of the company website using modern technologies"
  },
  { 
    id: "p2", 
    name: "Mobile App Development", 
    client: "TechStart Inc", 
    status: "Planning", 
    progress: 25, 
    dueDate: "2025-06-30",
    members: 6,
    description: "Building a native mobile application for iOS and Android platforms"
  },
  { 
    id: "p3", 
    name: "Marketing Campaign", 
    client: "GreenLife", 
    status: "Completed", 
    progress: 100, 
    dueDate: "2025-03-31",
    members: 3,
    description: "Q2 marketing campaign for product launch"
  },
  { 
    id: "p4", 
    name: "CRM Implementation", 
    client: "InnoSys", 
    status: "In Progress", 
    progress: 40, 
    dueDate: "2025-05-22",
    members: 5,
    description: "Implementation of customer relationship management system"
  },
];

// Associate project boards (kanban boards for each project)
export const projectBoards: Record<string, BoardData[]> = {
  "p1": [
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
      ],
    },
  ],
  "p2": [
    {
      id: "todo",
      title: "To Do",
      tasks: [
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
  ],
  "p3": [
    {
      id: "completed",
      title: "Completed",
      tasks: [
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
  ],
  "p4": [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "10",
          title: "Data migration plan",
          description: "Create a plan for migrating data to the new CRM",
          status: "To Do",
          assignee: "David Wilson",
          priority: "High",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "11",
          title: "Fix responsive layout issues",
          description: "Fix mobile responsiveness issues",
          status: "In Progress",
          assignee: "Michael Wilson",
          priority: "High",
        },
      ],
    },
  ],
}; 