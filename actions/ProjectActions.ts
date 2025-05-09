"use server"

import { prisma } from "@/server/prisma"
import { Project, Board, TaskPriority, Prisma } from "@prisma/client"
import { auth } from "@/server/auth"

export type CreateProjectInput = {
  name: string;
  description?: string | null;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  dueDate?: Date | null;
};

export const createProject = async (project: CreateProjectInput) => {
    const session = await auth();
    if(!session) {
        return {
            error: "Unauthorized"
        }
    }
    const organizationId = await prisma.user.findUnique({
        where: {
            id: session?.user.id as string
        },
        select:{
            organizationId: true
        }
    })  
   const createdProject = await prisma.project.create({
    data: {
        ...project,
        organizationId: organizationId?.organizationId as string
    }
   })
   return createdProject
}

export const getProjects = async () => {
    const session = await auth();
    const organizationId = await prisma.user.findUnique({
        where: {
            id: session?.user.id as string
        },
        select:{
            organizationId: true
        }
    })
    if(!session) {
        return {
            error: "Unauthorized"
        }
    }
    const projects = await prisma.project.findMany({
        where: {
            organizationId: organizationId?.organizationId as string
        }

    })
    return projects
}

export const getProjectById = async (id: string) => {
    const session = await auth();
    if(!session) {
        return {
            error: "Unauthorized"
        }
    }
    
    // Get the user's organization ID
    const userWithOrg = await prisma.user.findUnique({
        where: {
            id: session.user.id as string
        },
        select:{
            organizationId: true
        }
    });
    
    if (!userWithOrg?.organizationId) {
        return {
            error: "User does not belong to any organization"
        }
    }

    // Get the project with additional relationships
    const project = await prisma.project.findUnique({
        where: {
            id: id,
            organizationId: userWithOrg.organizationId
        },
        include: {
            assignees: true,
            boards: {
                include: {
                    tasks: true
                }
            }
        }
    });
    
    if (!project) {
        return {
            error: "Project not found"
        }
    }
    
    return project;
}

export type CreateBoardInput = {
  name: string;
  description?: string | null;
  color?: string | null;
  projectId: string;
};

export const createBoard = async (boardData: CreateBoardInput) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  // Verify project belongs to the user's organization
  const userWithOrg = await prisma.user.findUnique({
    where: {
      id: session.user.id as string
    },
    select: {
      organizationId: true
    }
  });

  if (!userWithOrg?.organizationId) {
    return {
      error: "User does not belong to any organization"
    };
  }

  // Verify project belongs to user's organization
  const project = await prisma.project.findUnique({
    where: {
      id: boardData.projectId,
      organizationId: userWithOrg.organizationId
    }
  });

  if (!project) {
    return {
      error: "Project not found or unauthorized access"
    };
  }

  // Create the new board
  const board = await prisma.board.create({
    data: boardData
  });

  return board;
}

export const deleteBoard = async (boardId: string) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  // Get the user's organization ID
  const userWithOrg = await prisma.user.findUnique({
    where: {
      id: session.user.id as string
    },
    select: {
      organizationId: true
    }
  });

  if (!userWithOrg?.organizationId) {
    return {
      error: "User does not belong to any organization"
    };
  }

  // Verify board belongs to a project in user's organization
  const board = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      project: true
    }
  });

  if (!board) {
    return {
      error: "Board not found"
    };
  }

  if (board.project.organizationId !== userWithOrg.organizationId) {
    return {
      error: "Unauthorized: Board does not belong to your organization"
    };
  }

  // Delete all tasks associated with the board first
  await prisma.task.deleteMany({
    where: {
      boardId: boardId
    }
  });

  // Delete the board
  const deletedBoard = await prisma.board.delete({
    where: {
      id: boardId
    }
  });

  return deletedBoard;
}

// Task related actions

export type CreateTaskInput = {
  name: string;
  description?: string | null;
  dueDate?: Date | null;
  boardId: string;
  priority?: "HIGH" | "MEDIUM" | "LOW";
  assigneeId: string;
};

export const createTask = async (taskData: CreateTaskInput) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  // Get the user's organization ID
  const userWithOrg = await prisma.user.findUnique({
    where: {
      id: session.user.id as string
    },
    select: {
      organizationId: true
    }
  });

  if (!userWithOrg?.organizationId) {
    return {
      error: "User does not belong to any organization"
    };
  }

  // Verify board belongs to a project in user's organization
  const board = await prisma.board.findUnique({
    where: {
      id: taskData.boardId,
    },
    include: {
      project: true
    }
  });

  if (!board) {
    return {
      error: "Board not found"
    };
  }

  if (board.project.organizationId !== userWithOrg.organizationId) {
    return {
      error: "Unauthorized: Board does not belong to your organization"
    };
  }

  // Create the task
  const task = await prisma.task.create({
    data: {
      name: taskData.name,
      description: taskData.description,
      dueDate: taskData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week from now
      boardId: taskData.boardId,
      priority: (taskData.priority || "MEDIUM") as TaskPriority,
      assigneeId: taskData.assigneeId || session.user.id as string // Default to current user
    }
  });

  return task;
}

export type UpdateTaskInput = {
  id: string;
  name?: string;
  description?: string | null;
  dueDate?: Date | null;
  priority?: "HIGH" | "MEDIUM" | "LOW";
  assigneeId?: string;
};

export const updateTask = async (taskData: UpdateTaskInput) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  // Verify the task exists and user has access
  const task = await prisma.task.findUnique({
    where: {
      id: taskData.id
    },
    include: {
      board: {
        include: {
          project: true
        }
      }
    }
  });

  if (!task) {
    return {
      error: "Task not found"
    };
  }

  // Get the user's organization ID
  const userWithOrg = await prisma.user.findUnique({
    where: {
      id: session.user.id as string
    },
    select: {
      organizationId: true
    }
  });

  if (!userWithOrg?.organizationId) {
    return {
      error: "User does not belong to any organization"
    };
  }

  // Check if user has access to this task via organization
  if (task.board.project.organizationId !== userWithOrg.organizationId) {
    return {
      error: "Unauthorized: Task does not belong to your organization"
    };
  }

  // Update the task
  const updatedTask = await prisma.task.update({
    where: {
      id: taskData.id
    },
    data: {
      name: taskData.name !== undefined ? taskData.name : undefined,
      description: taskData.description !== undefined ? taskData.description : undefined,
      dueDate: taskData.dueDate !== undefined 
        ? taskData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Use a default date if null is provided
        : undefined,
      priority: taskData.priority !== undefined ? taskData.priority as TaskPriority : undefined,
      assigneeId: taskData.assigneeId !== undefined ? taskData.assigneeId : undefined
    }
  });

  return updatedTask;
}

export const deleteTask = async (taskId: string) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  // Verify the task exists and user has access
  const task = await prisma.task.findUnique({
    where: {
      id: taskId
    },
    include: {
      board: {
        include: {
          project: true
        }
      }
    }
  });

  if (!task) {
    return {
      error: "Task not found"
    };
  }

  // Get the user's organization ID
  const userWithOrg = await prisma.user.findUnique({
    where: {
      id: session.user.id as string
    },
    select: {
      organizationId: true
    }
  });

  if (!userWithOrg?.organizationId) {
    return {
      error: "User does not belong to any organization"
    };
  }

  // Check if user has access to this task via organization
  if (task.board.project.organizationId !== userWithOrg.organizationId) {
    return {
      error: "Unauthorized: Task does not belong to your organization"
    };
  }

  // Delete the task
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId
    }
  });

  return deletedTask;
}

export const updateTaskBoard = async (taskId: string, newBoardId: string) => {
  const session = await auth();
  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  // Verify the task exists and user has access
  const task = await prisma.task.findUnique({
    where: {
      id: taskId
    },
    include: {
      board: {
        include: {
          project: true
        }
      }
    }
  });

  if (!task) {
    return {
      error: "Task not found"
    };
  }

  // Verify the destination board exists and belongs to the same project
  const newBoard = await prisma.board.findUnique({
    where: {
      id: newBoardId
    },
    include: {
      project: true
    }
  });

  if (!newBoard) {
    return {
      error: "Destination board not found"
    };
  }

  // Ensure both boards belong to the same project
  if (task.board.projectId !== newBoard.projectId) {
    return {
      error: "Cannot move task to a board in a different project"
    };
  }

  // Get the user's organization ID
  const userWithOrg = await prisma.user.findUnique({
    where: {
      id: session.user.id as string
    },
    select: {
      organizationId: true
    }
  });

  if (!userWithOrg?.organizationId) {
    return {
      error: "User does not belong to any organization"
    };
  }

  // Check if user has access to these boards via organization
  if (task.board.project.organizationId !== userWithOrg.organizationId) {
    return {
      error: "Unauthorized: Task does not belong to your organization"
    };
  }

  // Update the task's board
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId
    },
    data: {
      boardId: newBoardId
    }
  });

  return updatedTask;
}

