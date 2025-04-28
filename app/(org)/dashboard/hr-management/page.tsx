import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  User, 
  Plus, 
  FileText, 
  Calendar, 
  Award, 
  BarChart3, 
  PieChart,
  DollarSign,
  Briefcase,
  GraduationCap,
  Clock
} from "lucide-react";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">HR Management</h1>
        <p className="text-muted-foreground">Manage employees, attendance, and HR operations</p>
      </div>

      <Tabs defaultValue="employees">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+4 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">IT, HR, Finance, Sales, etc.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">5 in final interview stages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Retention</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5 yrs</div>
                <p className="text-xs text-muted-foreground">+0.5 from last year</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Employee Directory</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </div>
              <CardDescription>Manage employees and their information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="flex items-center justify-between p-4">
                  <Input 
                    placeholder="Search employees..." 
                    className="max-w-sm"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline">Filter</Button>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Name</th>
                        <th className="px-4 py-3 text-left font-medium">Department</th>
                        <th className="px-4 py-3 text-left font-medium">Position</th>
                        <th className="px-4 py-3 text-left font-medium">Contact</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Emma Thompson",
                          department: "Engineering",
                          position: "Senior Developer",
                          contact: "emma.t@example.com",
                          status: "Active"
                        },
                        {
                          name: "James Wilson",
                          department: "Marketing",
                          position: "Content Manager",
                          contact: "james.w@example.com",
                          status: "Active"
                        },
                        {
                          name: "Sophia Chen",
                          department: "Finance",
                          position: "Financial Analyst",
                          contact: "sophia.c@example.com",
                          status: "On Leave"
                        },
                        {
                          name: "Michael Rodriguez",
                          department: "HR",
                          position: "HR Director",
                          contact: "michael.r@example.com",
                          status: "Active"
                        },
                        {
                          name: "Sarah Johnson",
                          department: "Sales",
                          position: "Sales Executive",
                          contact: "sarah.j@example.com",
                          status: "Active"
                        }
                      ].map((employee, i) => (
                        <tr key={i} className="border-b">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-800 font-medium mr-2">
                                {employee.name.charAt(0)}
                              </div>
                              {employee.name}
                            </div>
                          </td>
                          <td className="px-4 py-3">{employee.department}</td>
                          <td className="px-4 py-3">{employee.position}</td>
                          <td className="px-4 py-3">{employee.contact}</td>
                          <td className="px-4 py-3">
                            <Badge 
                              variant={employee.status === "Active" ? "default" : "outline"}
                              className={employee.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                            >
                              {employee.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <User className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 124 employees
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98/124</div>
                <p className="text-xs text-muted-foreground">79% attendance rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">8 planned, 4 sick leave</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remote Working</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">26% of workforce</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.8 hrs</div>
                <p className="text-xs text-muted-foreground">+0.3 from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Log</CardTitle>
                <CardDescription>Today's check-ins and check-outs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Employee</th>
                        <th className="px-4 py-3 text-left font-medium">Check In</th>
                        <th className="px-4 py-3 text-left font-medium">Check Out</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Emma Thompson", checkIn: "08:45 AM", checkOut: "05:15 PM", status: "Present" },
                        { name: "James Wilson", checkIn: "09:02 AM", checkOut: "--:-- --", status: "Present" },
                        { name: "Michael Rodriguez", checkIn: "08:30 AM", checkOut: "04:45 PM", status: "Present" },
                        { name: "Sarah Johnson", checkIn: "--:-- --", checkOut: "--:-- --", status: "Absent" },
                        { name: "David Lee", checkIn: "08:55 AM", checkOut: "--:-- --", status: "Present" }
                      ].map((record, i) => (
                        <tr key={i} className="border-b">
                          <td className="px-4 py-3">{record.name}</td>
                          <td className="px-4 py-3">{record.checkIn}</td>
                          <td className="px-4 py-3">{record.checkOut}</td>
                          <td className="px-4 py-3">
                            <Badge 
                              variant={record.status === "Present" ? "default" : "outline"}
                              className={record.status === "Present" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}
                            >
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Off Requests</CardTitle>
                <CardDescription>Pending approval requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Emma Thompson", type: "Vacation", dates: "May 15-22, 2025", status: "Pending" },
                    { name: "James Wilson", type: "Sick Leave", dates: "Apr 28, 2025", status: "Approved" },
                    { name: "Sarah Johnson", type: "Personal", dates: "May 5-6, 2025", status: "Pending" }
                  ].map((request, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-muted-foreground">{request.type} • {request.dates}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge 
                          className={
                            request.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                            request.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {request.status}
                        </Badge>
                        {request.status === "Pending" && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$427,890</div>
                <p className="text-xs text-muted-foreground">For current month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$86,500</div>
                <p className="text-xs text-muted-foreground">+4.3% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bonuses</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$52,400</div>
                <p className="text-xs text-muted-foreground">Q2 performance bonuses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Salary revisions pending</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payroll Management</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Run Payroll
                </Button>
              </div>
              <CardDescription>Manage payroll processing and history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">Filter by:</div>
                    <select className="p-2 border rounded-md">
                      <option>All Departments</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Finance</option>
                    </select>
                    <select className="p-2 border rounded-md">
                      <option>April 2025</option>
                      <option>March 2025</option>
                      <option>February 2025</option>
                      <option>January 2025</option>
                    </select>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Employee</th>
                      <th className="px-4 py-3 text-left font-medium">Department</th>
                      <th className="px-4 py-3 text-left font-medium">Base Salary</th>
                      <th className="px-4 py-3 text-left font-medium">Bonus</th>
                      <th className="px-4 py-3 text-left font-medium">Deductions</th>
                      <th className="px-4 py-3 text-left font-medium">Net Pay</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Emma Thompson",
                        department: "Engineering",
                        baseSalary: "$8,500",
                        bonus: "$1,200",
                        deductions: "$2,320",
                        netPay: "$7,380",
                        status: "Paid"
                      },
                      {
                        name: "James Wilson",
                        department: "Marketing",
                        baseSalary: "$7,200",
                        bonus: "$500",
                        deductions: "$1,900",
                        netPay: "$5,800",
                        status: "Paid"
                      },
                      {
                        name: "Sophia Chen",
                        department: "Finance",
                        baseSalary: "$9,100",
                        bonus: "$0",
                        deductions: "$2,450",
                        netPay: "$6,650",
                        status: "Pending"
                      },
                      {
                        name: "Michael Rodriguez",
                        department: "HR",
                        baseSalary: "$8,800",
                        bonus: "$1,500",
                        deductions: "$2,420",
                        netPay: "$7,880",
                        status: "Paid"
                      },
                      {
                        name: "Sarah Johnson",
                        department: "Sales",
                        baseSalary: "$7,900",
                        bonus: "$2,200",
                        deductions: "$2,190",
                        netPay: "$7,910",
                        status: "Paid"
                      }
                    ].map((employee, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-3">{employee.name}</td>
                        <td className="px-4 py-3">{employee.department}</td>
                        <td className="px-4 py-3">{employee.baseSalary}</td>
                        <td className="px-4 py-3">{employee.bonus}</td>
                        <td className="px-4 py-3">{employee.deductions}</td>
                        <td className="px-4 py-3 font-medium">{employee.netPay}</td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant="outline"
                            className={employee.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                          >
                            {employee.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78/124</div>
                <p className="text-xs text-muted-foreground">63% completion rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8/5.0</div>
                <p className="text-xs text-muted-foreground">+0.2 from last cycle</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">17</div>
                <p className="text-xs text-muted-foreground">Employees rated 4.5+</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Programs</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Active this quarter</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reviews</CardTitle>
                <CardDescription>Current review cycle progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Engineering", completed: 22, total: 28, percentage: 78 },
                    { name: "Marketing", completed: 12, total: 18, percentage: 67 },
                    { name: "Sales", completed: 19, total: 25, percentage: 76 },
                    { name: "Finance", completed: 8, total: 12, percentage: 67 },
                    { name: "HR", completed: 5, total: 8, percentage: 63 },
                    { name: "Operations", completed: 12, total: 20, percentage: 60 },
                  ].map((dept, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div>{dept.name}</div>
                        <div className="text-muted-foreground">{dept.completed}/{dept.total}</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-nexus-600 rounded-full" 
                          style={{ width: `${dept.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Assessment</CardTitle>
                <CardDescription>Team skill distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-48 w-48 text-muted-foreground" />
                  {/* This would be a real chart in a production app */}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    { skill: "Technical", color: "bg-blue-500", value: "78%" },
                    { skill: "Leadership", color: "bg-green-500", value: "65%" },
                    { skill: "Communication", color: "bg-purple-500", value: "82%" },
                    { skill: "Problem Solving", color: "bg-yellow-500", value: "76%" },
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${skill.color}`}></div>
                      <div className="text-sm">{skill.skill}: <span className="font-medium">{skill.value}</span></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Training & Development</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Program
                </Button>
              </div>
              <CardDescription>Active training programs and enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Program Name</th>
                      <th className="px-4 py-3 text-left font-medium">Focus Area</th>
                      <th className="px-4 py-3 text-left font-medium">Duration</th>
                      <th className="px-4 py-3 text-left font-medium">Participants</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Leadership Excellence",
                        area: "Management",
                        duration: "12 weeks",
                        participants: 18,
                        status: "In Progress",
                        progress: 65
                      },
                      {
                        name: "Advanced Coding Practices",
                        area: "Technical",
                        duration: "8 weeks",
                        participants: 24,
                        status: "In Progress",
                        progress: 40
                      },
                      {
                        name: "Strategic Communication",
                        area: "Soft Skills",
                        duration: "6 weeks",
                        participants: 32,
                        status: "Completed",
                        progress: 100
                      },
                      {
                        name: "Financial Analysis",
                        area: "Finance",
                        duration: "10 weeks",
                        participants: 12,
                        status: "Upcoming",
                        progress: 0
                      },
                      {
                        name: "Project Management",
                        area: "Operations",
                        duration: "8 weeks",
                        participants: 20,
                        status: "In Progress",
                        progress: 75
                      }
                    ].map((program, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-4 py-3 font-medium">{program.name}</td>
                        <td className="px-4 py-3">{program.area}</td>
                        <td className="px-4 py-3">{program.duration}</td>
                        <td className="px-4 py-3">{program.participants}</td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant="outline"
                            className={
                              program.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                              program.status === "Completed" ? "bg-green-100 text-green-800" :
                              "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {program.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-nexus-600 rounded-full" 
                              style={{ width: `${program.progress}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
