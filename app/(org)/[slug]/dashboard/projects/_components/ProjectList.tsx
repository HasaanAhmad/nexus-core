"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CreateProjectModal from "./CreateProjectModal";

// Define the Project type that matches what's returned from the server
interface Project {
  id: string;
  name: string;
  status: string;
  dueDate: string | null;
  // Other fields that might be available from the server
  createdAt?: Date;
  updatedAt?: Date;
  organizationId?: string;
}

interface ProjectListProps {
  projects: Project[];
  slug: string;
}

export default function ProjectList({ projects, slug }: ProjectListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<Project[]>(projects);

  // Helper function to format status for display
  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // Helper to calculate project progress (not provided from server)
  const getProjectProgress = (project: Project) => {
    if ('progress' in project) {
      return (project as any).progress || 0;
    }
    
    // Default progress calculation based on status
    if (project.status === 'COMPLETED') return 100;
    if (project.status === 'IN_PROGRESS') return 50;
    return 10; // Default for planning
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project Management</h1>
        <Button 
          className="bg-nexus-600 hover:bg-nexus-700"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Projects</CardTitle>
            <CardDescription>Active and completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projectsList.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
            <CardDescription>Active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {projectsList.filter(p => p.status === "IN_PROGRESS").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completed</CardTitle>
            <CardDescription>Finished projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {projectsList.filter(p => p.status === "COMPLETED").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Planning</CardTitle>
            <CardDescription>Projects in planning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {projectsList.filter(p => p.status === "PLANNING").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {projectsList.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Project List</CardTitle>
            <CardDescription>Click on a project to view tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsList.map((project) => (
                <Link
                  href={`/${slug}/dashboard/projects/${project.id}`}
                  key={project.id}
                  className="block"
                >
                  <div className="p-4 border rounded-lg transition-all duration-200 hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                      </div>
                      <div className="flex">
                        <Badge 
                          variant="outline" 
                          className={
                            project.status === "COMPLETED" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                            project.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                            "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {formatStatus(project.status)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{getProjectProgress(project)}%</span>
                      </div>
                      <Progress value={getProjectProgress(project)} className="h-2" />
                    </div>
                    <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'Not set'}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Team
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6 flex justify-center">
              <Sparkles className="h-16 w-16 text-nexus-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-8">
              This might be the start of something big! 🚀 Create your first project and begin tracking your work.
            </p>
            <Button
              className="bg-nexus-600 hover:bg-nexus-700 inline-flex items-center"
              onClick={() => setIsCreateModalOpen(true)}
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Project
            </Button>
          </div>
        </Card>
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => window.location.reload()}
      />
    </div>
  );
} 