'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Package,
  Briefcase,
  Calendar
} from "lucide-react";
import { useState, useEffect } from 'react'

const revenueData = [
  { name: 'Jan', value: 1200 },
  { name: 'Feb', value: 1900 },
  { name: 'Mar', value: 1500 },
  { name: 'Apr', value: 2200 },
  { name: 'May', value: 2800 },
  { name: 'Jun', value: 2300 },
];

const pieData = [
  { name: 'Marketing', value: 540 },
  { name: 'Development', value: 620 },
  { name: 'Research', value: 210 },
  { name: 'Operations', value: 430 },
];

const projectData = [
  { name: 'Week 1', complete: 20, incomplete: 5 },
  { name: 'Week 2', complete: 25, incomplete: 8 },
  { name: 'Week 3', complete: 18, incomplete: 7 },
  { name: 'Week 4', complete: 30, incomplete: 3 },
];

const COLORS = ['#7938e8', '#9452eb', '#ac79f2', '#c6a8f8'];

export default function Page() {
  const [currentTime] = useState(Date.now())
  const [formattedDates, setFormattedDates] = useState<string[]>([])
  
 
  // Handle date formatting on client-side only to avoid hydration mismatch
  useEffect(() => {
    const dates = []
    for (let i = 0; i < 5; i++) {
      dates.push(new Date(currentTime - i * 3600000).toLocaleString())
    }
    setFormattedDates(dates)
  }, [currentTime])

  return (

    <div className="space-y-6 w-max-4 mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Nexus Core ERP Admin</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-600">
              <Briefcase size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight size={14} className="mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+20.1%</span>&nbsp;from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-600">
              <Users size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight size={14} className="mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+18.2%</span>&nbsp;from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <div className="h-8 w-8 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-600">
              <Package size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowDownRight size={14} className="mr-1 text-red-500" />
              <span className="text-red-500 font-medium">-3.2%</span>&nbsp;from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Events</CardTitle>
            <div className="h-8 w-8 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-600">
              <Calendar size={18} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUpRight size={14} className="mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+5.4%</span>&nbsp;from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid #f0f0f0",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="value" fill="#7938e8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Budget</CardTitle>
            <CardDescription>Budget allocation by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#7938e8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Weekly project completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="complete" stroke="#7938e8" strokeWidth={2} />
                  <Line type="monotone" dataKey="incomplete" stroke="#c6a8f8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 rounded-full bg-nexus-100 flex items-center justify-center text-nexus-600">
                    {i % 3 === 0 ? (
                      <Users size={18} />
                    ) : i % 3 === 1 ? (
                      <Briefcase size={18} />
                    ) : (
                      <Package size={18} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {i % 3 === 0
                        ? "New user registered"
                        : i % 3 === 1
                          ? "New project created"
                          : "Inventory updated"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formattedDates[i] || ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
