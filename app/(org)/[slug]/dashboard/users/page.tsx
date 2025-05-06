import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, UserPlus, Filter, MoreHorizontal, User, Edit, Trash2 } from "lucide-react";
import CreateForm from "./_components/CreateForm";
import AllForms from "./_components/AllForms";
import { auth } from "@/server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Responses from './_components/Responses';
import AllUsers from './_components/AllUsers';
// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    role: "Admin",
    avatar: "/avatars/alex.jpg",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Editor",
    avatar: "/avatars/sarah.jpg",
    lastActive: "5 min ago"
  },
  {
    id: "3",
    name: "David Martinez",
    email: "david.m@example.com",
    role: "Viewer",
    avatar: "/avatars/david.jpg",
    lastActive: "1 day ago"
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "Editor",
    avatar: "/avatars/emily.jpg",
    lastActive: "Just now"
  },
  {
    id: "5",
    name: "Michael Rogers",
    email: "m.rogers@example.com",
    role: "Viewer",
    avatar: "/avatars/michael.jpg",
    lastActive: "3 days ago"
  }
];

// Role color mapping
const roleColors = {
  Admin: "bg-red-100 text-red-800",
  Editor: "bg-blue-100 text-blue-800",
  Viewer: "bg-green-100 text-green-800"
};

const page = async () => {
  const session = await auth()
  return (
    <div className="space-y-6 w-max-4 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users & Role Management</h1>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles and Permission</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, their roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite User
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="relative w-full max-w-sm">
                  <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <AllUsers/>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Manage role definitions and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Role management content</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for the role management interface</p>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Generated Registration Forms</CardTitle>
              <CardDescription>Manage AI generated Forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='p-5'>
                <div className='font-normal text-3xl flex items-center justify-between'>
                  <h2>Generated Registration Forms</h2>
                  <CreateForm user={session}/>
                </div>
                <div className='mt-10'>
                  <AllForms user={session}/>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle>Form Responses</CardTitle>
              <CardDescription>View and manage form responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Form responses content</h3>
                <Responses user={session?.user}/>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page