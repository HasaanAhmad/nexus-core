'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, UserCheck, CheckCircle, Calendar as CalendarIcon, Filter, Download } from "lucide-react";
import { useState } from "react";

const attendanceData = [
  { id: 1, employee: "John Doe", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "Present", date: "2025-04-08" },
  { id: 2, employee: "Jane Smith", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present", date: "2025-04-08" },
  { id: 3, employee: "Robert Johnson", checkIn: "09:30 AM", checkOut: "06:00 PM", status: "Present", date: "2025-04-08" },
  { id: 4, employee: "Emily Davis", checkIn: "10:15 AM", checkOut: "06:45 PM", status: "Late", date: "2025-04-08" },
  { id: 5, employee: "Michael Wilson", checkIn: "--", checkOut: "--", status: "Absent", date: "2025-04-08" },
];
import React from 'react'

const AdminSideAttendance = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <Button className="bg-nexus-600 hover:bg-nexus-700">
            <UserCheck className="mr-2 h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
  
        <Tabs defaultValue="daily">
          <TabsList>
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Daily Attendance</CardTitle>
                        <CardDescription>
                          {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.employee}</TableCell>
                            <TableCell>{record.checkIn}</TableCell>
                            <TableCell>{record.checkOut}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={
                                  record.status === "Present" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                                  record.status === "Late" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                                  "bg-red-100 text-red-800 hover:bg-red-100"
                                }
                              >
                                {record.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                    <CardDescription>Select a date to view attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Attendance Summary</CardTitle>
                    <CardDescription>Today's stats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-3">
                            <CheckCircle size={16} />
                          </div>
                          <span>Present</span>
                        </div>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 mr-3">
                            <Clock size={16} />
                          </div>
                          <span>Late</span>
                        </div>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 mr-3">
                            <CalendarIcon size={16} />
                          </div>
                          <span>Absent</span>
                        </div>
                        <span className="font-medium">2</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
                <CardDescription>View attendance data for the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Weekly attendance view</h3>
                  <p className="text-muted-foreground mb-4">This is a placeholder for the weekly attendance view</p>
                  <Button>View Detailed Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
                <CardDescription>View attendance data for the month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Monthly attendance view</h3>
                  <p className="text-muted-foreground mb-4">This is a placeholder for the monthly attendance view</p>
                  <Button>View Detailed Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>Generate and download attendance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Attendance reports</h3>
                  <p className="text-muted-foreground mb-4">This is a placeholder for the attendance reports page</p>
                  <Button>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
}

export default AdminSideAttendance