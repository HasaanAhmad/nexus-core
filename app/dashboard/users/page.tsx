import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, UserPlus, Filter, MoreHorizontal } from "lucide-react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Administrator", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Developer", status: "Inactive" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Customer Support", status: "Active" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Marketing", status: "Active" },
];


const page = () => {
  return (
    <div className="space-y-6 w-max-4 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users & Role Management</h1>
        <Button className="bg-nexus-600 hover:bg-nexus-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, their roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-9 pr-4 py-2 w-80 rounded-md border"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>Configure granular permissions for roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Permission management content</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for the permission management interface</p>
                <Button>Manage Permissions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page