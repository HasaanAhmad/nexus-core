
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, MoreHorizontal, ChevronUp, ChevronDown, DollarSign, Users, Building, Phone } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const leads = [
  { id: 1, name: "Tech Innovations Inc", contact: "John Smith", email: "john@techinnovations.com", phone: "(555) 123-4567", status: "New", value: 15000 },
  { id: 2, name: "Global Solutions LLC", contact: "Sarah Johnson", email: "sarah@globalsolutions.com", phone: "(555) 234-5678", status: "Contacted", value: 25000 },
  { id: 3, name: "Acme Corporation", contact: "Robert Brown", email: "robert@acmecorp.com", phone: "(555) 345-6789", status: "Qualified", value: 50000 },
  { id: 4, name: "Quantum Systems", contact: "Emily Wilson", email: "emily@quantumsystems.com", phone: "(555) 456-7890", status: "Proposal", value: 30000 },
  { id: 5, name: "Phoenix Industries", contact: "Michael Davis", email: "michael@phoenix.com", phone: "(555) 567-8901", status: "Negotiation", value: 75000 },
];

const customers = [
  { id: 1, name: "StarTech Solutions", contact: "Jennifer Lee", email: "jennifer@startech.com", phone: "(555) 678-9012", revenue: 120000, status: "Active" },
  { id: 2, name: "Horizon Enterprises", contact: "David Wilson", email: "david@horizon.com", phone: "(555) 789-0123", revenue: 85000, status: "Active" },
  { id: 3, name: "Summit Group", contact: "Laura Martinez", email: "laura@summit.com", phone: "(555) 890-1234", revenue: 65000, status: "Inactive" },
  { id: 4, name: "Atlas Corporation", contact: "James Taylor", email: "james@atlas.com", phone: "(555) 901-2345", revenue: 150000, status: "Active" },
];

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">CRM Management</h1>
        <Button className="bg-nexus-600 hover:bg-nexus-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Leads</CardTitle>
            <CardDescription>Current leads in pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">142</div>
              <div className="text-green-500 flex items-center">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Customers</CardTitle>
            <CardDescription>Acquired this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">8</div>
              <div className="text-green-500 flex items-center">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pipeline Value</CardTitle>
            <CardDescription>Total opportunity value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">$1.2M</div>
              <div className="text-red-500 flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" />
                <span className="text-sm">3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
            <CardDescription>Lead to customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24%</div>
              <div className="text-green-500 flex items-center">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-sm">2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leads">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Track and manage potential customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search leads..."
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

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                        </TableCell>
                        <TableCell>
                          <div>{lead.contact}</div>
                          <div className="text-sm text-muted-foreground">{lead.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              lead.status === "New" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : 
                              lead.status === "Contacted" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : 
                              lead.status === "Qualified" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              lead.status === "Proposal" ? "bg-purple-100 text-purple-800 hover:bg-purple-100" : 
                              "bg-orange-100 text-orange-800 hover:bg-orange-100"
                            }
                          >
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${lead.value.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>Manage your existing customer relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search customers..."
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

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">{customer.email}</div>
                        </TableCell>
                        <TableCell>
                          <div>{customer.contact}</div>
                          <div className="text-sm text-muted-foreground">{customer.phone}</div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              customer.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${customer.revenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deals">
          <Card>
            <CardHeader>
              <CardTitle>Deal Pipeline</CardTitle>
              <CardDescription>Track deals through sales stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'].map((stage, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="p-3 bg-muted/20">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm">{stage}</CardTitle>
                          <Badge variant="outline" className="font-normal">
                            {i === 0 ? 8 : i === 1 ? 12 : i === 2 ? 5 : i === 3 ? 3 : 2}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-2">
                        <div className="text-sm font-medium mb-1">
                          {i === 0 ? "New Leads" : i === 1 ? "Initial Contact" : i === 2 ? "Qualified Leads" : i === 3 ? "Sent Proposals" : "Final Negotiations"}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {i === 0 ? "$120,000" : i === 1 ? "$250,000" : i === 2 ? "$380,000" : i === 3 ? "$420,000" : "$550,000"}
                        </div>
                        <Progress value={i === 0 ? 15 : i === 1 ? 35 : i === 2 ? 60 : i === 3 ? 80 : 95} className="h-1.5" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button>View Full Pipeline</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Monthly revenue and conversion metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Analytics charts would be displayed here</p>
                  <p className="text-muted-foreground mb-4">This is a placeholder for the sales performance charts</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Sales Reps</CardTitle>
                <CardDescription>Based on closed deals this quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Sarah Johnson', 'Michael Chen', 'David Rodriguez', 'Lisa Williams'].map((name, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-nexus-100 text-nexus-800 font-medium">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <Progress value={90 - i * 15} className="h-2 flex-1 mr-4" />
                          <span className="text-sm font-medium">${(250000 - i * 50000).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: 'Website', percentage: 35, icon: Building },
                    { source: 'Referrals', percentage: 25, icon: Users },
                    { source: 'Direct', percentage: 20, icon: Phone },
                    { source: 'Social Media', percentage: 15, icon: DollarSign },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <item.icon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{item.source}</span>
                        </div>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
