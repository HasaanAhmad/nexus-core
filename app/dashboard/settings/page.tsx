
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Save, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  Database,
  ServerCog,
  PlusCircle,
  Moon,
  Sun
} from "lucide-react";

// Adding the missing Badge component
import { Badge } from "@/components/ui/badge";

const page = () => {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and system settings</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage how your profile appears to others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="Senior Administrator" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Operations" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio" 
                      rows={4} 
                      className="w-full p-2 border rounded-md" 
                      defaultValue="System administrator with over 5 years of experience managing enterprise software solutions."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-nexus-600 hover:bg-nexus-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="w-full p-2 border rounded-md">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select id="timezone" className="w-full p-2 border rounded-md">
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT-07:00) Mountain Time</option>
                    <option>(GMT-06:00) Central Time</option>
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT+00:00) UTC</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-md">
                      <div>
                        <h4 className="font-medium">Deactivate Account</h4>
                        <p className="text-sm text-muted-foreground">Temporarily disable your account</p>
                      </div>
                      <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        Deactivate
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-md">
                      <div>
                        <h4 className="font-medium">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-nexus-600 hover:bg-nexus-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <div className="space-y-4">
                
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Layout</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="denseModeSwitch" />
                      <Label htmlFor="denseModeSwitch">Dense Mode (Compact UI)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="animationsSwitch" defaultChecked />
                      <Label htmlFor="animationsSwitch">Enable Animations</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="sidebarCollapseSwitch" defaultChecked />
                      <Label htmlFor="sidebarCollapseSwitch">Collapsible Sidebar</Label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Accessibility</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="highContrastSwitch" />
                      <Label htmlFor="highContrastSwitch">High Contrast Mode</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="largeTextSwitch" />
                      <Label htmlFor="largeTextSwitch">Larger Text</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="reduceMotionSwitch" />
                      <Label htmlFor="reduceMotionSwitch">Reduce Motion</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-nexus-600 hover:bg-nexus-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: "emailSystemSwitch", label: "System Updates" },
                      { id: "emailSecuritySwitch", label: "Security Alerts", defaultChecked: true },
                      { id: "emailTaskSwitch", label: "Task Assignments", defaultChecked: true },
                      { id: "emailCommentSwitch", label: "Comment Mentions", defaultChecked: true },
                      { id: "emailNewsletterSwitch", label: "Newsletter & Announcements" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-2">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">In-App Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: "inAppMentionSwitch", label: "Mentions", defaultChecked: true },
                      { id: "inAppMessageSwitch", label: "Direct Messages", defaultChecked: true },
                      { id: "inAppCommentSwitch", label: "Comments", defaultChecked: true },
                      { id: "inAppTaskSwitch", label: "Task Status Changes", defaultChecked: true },
                      { id: "inAppProjectSwitch", label: "Project Updates", defaultChecked: true },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-2">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: "smsSecuritySwitch", label: "Security Alerts", defaultChecked: true },
                      { id: "smsUrgentSwitch", label: "Urgent Messages" },
                      { id: "smsReminderSwitch", label: "Reminders" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b pb-2">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <Switch id={item.id} defaultChecked={item.defaultChecked} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-nexus-600 hover:bg-nexus-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage account security and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="bg-nexus-600 hover:bg-nexus-700">
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="twoFactorSwitch" />
                    </div>
                    <Button variant="outline">Set Up Two-Factor Authentication</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Sessions</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground mb-2">Windows 11 · Chrome · New York, USA</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active Now</Badge>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="font-medium">Previous Session</div>
                      <div className="text-sm text-muted-foreground mb-2">macOS · Safari · New York, USA</div>
                      <div className="text-xs text-muted-foreground">Last active: April 8, 2025, 2:45 PM</div>
                    </div>
                    
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      Sign Out All Other Sessions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect with other services and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { 
                    name: "Google Workspace", 
                    description: "Connect your Google account for calendar and document integration",
                    status: "Connected",
                    icon: <Globe className="h-8 w-8" />
                  },
                  { 
                    name: "Microsoft 365", 
                    description: "Integrate with Microsoft services including Teams and Office",
                    status: "Not Connected",
                    icon: <Database className="h-8 w-8" />
                  },
                  { 
                    name: "Slack", 
                    description: "Send notifications and updates to your Slack channels",
                    status: "Connected",
                    icon: <Mail className="h-8 w-8" />
                  },
                  { 
                    name: "GitHub", 
                    description: "Link to GitHub repositories for project management",
                    status: "Not Connected",
                    icon: <ServerCog className="h-8 w-8" />
                  },
                ].map((integration, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex gap-4">
                      <div className="p-2 bg-muted rounded-md">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    
                    <div>
                      {integration.status === "Connected" ? (
                        <Button variant="outline">Disconnect</Button>
                      ) : (
                        <Button className="bg-nexus-600 hover:bg-nexus-700">Connect</Button>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="text-center pt-4">
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Browse More Integrations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">API Keys</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-medium">Production API Key</h4>
                        <div className="font-mono text-sm bg-muted p-1 rounded mt-1">
                          ••••••••••••••••••••••••••3a5d
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Created: March 15, 2025
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Show</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-medium">Development API Key</h4>
                        <div className="font-mono text-sm bg-muted p-1 rounded mt-1">
                          ••••••••••••••••••••••••••9f7b
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Created: April 2, 2025
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Show</Button>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                    
                    <Button className="bg-nexus-600 hover:bg-nexus-700">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New API Key
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Webhooks</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h4 className="font-medium">Notification Webhook</h4>
                        <p className="text-sm text-muted-foreground">https://example.com/api/webhooks/notifications</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          Events: user.created, user.updated
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <Button className="bg-nexus-600 hover:bg-nexus-700">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Webhook
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Rate Limits</h3>
                  <div className="p-4 border rounded-md">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Current Plan:</span>
                        <span>Business</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Rate Limit:</span>
                        <span>1,000 requests per minute</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Daily Quota:</span>
                        <span>1,000,000 requests</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure global system parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">General</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="Nexus Technologies" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input id="supportEmail" type="email" defaultValue="support@nexustech.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select id="dateFormat" className="w-full p-2 border rounded-md">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeFormat">Time Format</Label>
                      <select id="timeFormat" className="w-full p-2 border rounded-md">
                        <option>12-hour (AM/PM)</option>
                        <option>24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Backup & Maintenance</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Automated Backups</h4>
                      <div className="flex items-center space-x-2 mb-4">
                        <Switch id="backupSwitch" defaultChecked />
                        <Label htmlFor="backupSwitch">Enable daily backups</Label>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backupTime">Backup Time</Label>
                        <select id="backupTime" className="w-full p-2 border rounded-md">
                          <option>12:00 AM (Midnight)</option>
                          <option>2:00 AM</option>
                          <option>4:00 AM</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">System Maintenance</h4>
                      <div className="flex items-center space-x-2 mb-4">
                        <Switch id="maintenanceSwitch" />
                        <Label htmlFor="maintenanceSwitch">Enable maintenance mode</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        When enabled, the system will be unavailable to users except administrators.
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Create Backup
                      </Button>
                      <Button variant="outline">
                        Restore from Backup
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">License</h3>
                  <div className="p-4 border rounded-md">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">License Type:</span>
                        <span>Enterprise</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Valid Until:</span>
                        <span>December 31, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Registered To:</span>
                        <span>Nexus Technologies, Inc.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-nexus-600 hover:bg-nexus-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
