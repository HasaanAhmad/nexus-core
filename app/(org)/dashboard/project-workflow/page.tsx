import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, Calendar, Clock, Users, CheckSquare, ListChecks } from "lucide-react";

const projects = [
  { 
    id: 1, 
    name: "Website Redesign", 
    client: "Acme Corp", 
    status: "In Progress", 
    progress: 65, 
    dueDate: "2025-05-15",
    members: 4
  },
  { 
    id: 2, 
    name: "Mobile App Development", 
    client: "TechStart Inc", 
    status: "Planning", 
    progress: 25, 
    dueDate: "2025-06-30",
    members: 6
  },
  { 
    id: 3, 
    name: "Marketing Campaign", 
    client: "GreenLife", 
    status: "Completed", 
    progress: 100, 
    dueDate: "2025-03-31",
    members: 3
  },
  { 
    id: 4, 
    name: "CRM Implementation", 
    client: "InnoSys", 
    status: "In Progress", 
    progress: 40, 
    dueDate: "2025-05-22",
    members: 5
  },
];

const tasks = [
  { id: 1, title: "Design homepage wireframes", status: "Completed", assignee: "Jane Smith", priority: "High" },
  { id: 2, title: "Implement user authentication", status: "In Progress", assignee: "Robert Johnson", priority: "High" },
  { id: 3, title: "Create API documentation", status: "To Do", assignee: "Emily Davis", priority: "Medium" },
  { id: 4, title: "Fix responsive layout issues", status: "In Progress", assignee: "Michael Wilson", priority: "High" },
  { id: 5, title: "Write user guides", status: "To Do", assignee: "Sarah Thompson", priority: "Low" },
];
import React from 'react'


const page = () => {
    return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Project Workflow Management</h1>
            <Button className="bg-nexus-600 hover:bg-nexus-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
    
          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Projects</CardTitle>
                    <CardDescription>Active and completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">In Progress</CardTitle>
                    <CardDescription>Active projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">5</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Completed</CardTitle>
                    <CardDescription>Finished projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">6</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Planning</CardTitle>
                    <CardDescription>Projects in planning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1</div>
                  </CardContent>
                </Card>
              </div>
    
              <Card>
                <CardHeader>
                  <CardTitle>Project List</CardTitle>
                  <CardDescription>Overview of all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                          </div>
                          <div className="flex">
                            <Badge 
                              variant="outline" 
                              className={
                                project.status === "Completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                                project.status === "In Progress" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                                "bg-amber-100 text-amber-800 hover:bg-amber-100"
                              }
                            >
                              {project.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2 " />
                        </div>
                        <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Due: {new Date(project.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {project.members} members
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tasks">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Task Management</CardTitle>
                    <CardDescription>Track and manage project tasks</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2 bg-muted/20">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">To Do</CardTitle>
                          <Badge variant="outline">2</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-2">
                        <div className="space-y-2 mt-2">
                          {tasks.filter(task => task.status === "To Do").map(task => (
                            <div key={task.id} className="p-3 bg-card rounded-lg border shadow-sm">
                              <div className="font-medium mb-1">{task.title}</div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{task.assignee}</span>
                                <Badge variant="outline" className={
                                  task.priority === "High" ? "bg-red-100 text-red-800 border-red-200" :
                                  task.priority === "Medium" ? "bg-amber-100 text-amber-800 border-amber-200" :
                                  "bg-green-100 text-green-800 border-green-200"
                                }>
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2 bg-muted/20">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">In Progress</CardTitle>
                          <Badge variant="outline">2</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-2">
                        <div className="space-y-2 mt-2">
                          {tasks.filter(task => task.status === "In Progress").map(task => (
                            <div key={task.id} className="p-3 bg-card rounded-lg border shadow-sm">
                              <div className="font-medium mb-1">{task.title}</div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{task.assignee}</span>
                                <Badge variant="outline" className={
                                  task.priority === "High" ? "bg-red-100 text-red-800 border-red-200" :
                                  task.priority === "Medium" ? "bg-amber-100 text-amber-800 border-amber-200" :
                                  "bg-green-100 text-green-800 border-green-200"
                                }>
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2 bg-muted/20">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">Completed</CardTitle>
                          <Badge variant="outline">1</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-2">
                        <div className="space-y-2 mt-2">
                          {tasks.filter(task => task.status === "Completed").map(task => (
                            <div key={task.id} className="p-3 bg-card rounded-lg border shadow-sm">
                              <div className="font-medium mb-1">{task.title}</div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{task.assignee}</span>
                                <Badge variant="outline" className={
                                  task.priority === "High" ? "bg-red-100 text-red-800 border-red-200" :
                                  task.priority === "Medium" ? "bg-amber-100 text-amber-800 border-amber-200" :
                                  "bg-green-100 text-green-800 border-green-200"
                                }>
                                  {task.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Project Calendar</CardTitle>
                  <CardDescription>View project timelines and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-2">Project calendar view</h3>
                    <p className="text-muted-foreground mb-4">This is a placeholder for the project calendar</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Month View
                      </Button>
                      <Button variant="outline">
                        <Clock className="mr-2 h-4 w-4" />
                        Timeline View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Project Reports</CardTitle>
                  <CardDescription>Analytics and insights on project performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-2">Project reports</h3>
                    <p className="text-muted-foreground mb-4">This is a placeholder for the project reports page</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline">
                        <ListChecks className="mr-2 h-4 w-4" />
                        Task Reports
                      </Button>
                      <Button variant="outline">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Completion Reports
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    )
}

export default page