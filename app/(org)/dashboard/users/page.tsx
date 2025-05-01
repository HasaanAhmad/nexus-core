import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, UserPlus, Filter, MoreHorizontal } from "lucide-react";
import  CreateForm  from "./_components/CreateForm";
import  AllForms  from "./_components/AllForms";
import {auth} from "@/server/auth";


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