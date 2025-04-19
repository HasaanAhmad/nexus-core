
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PaperclipIcon, Send, MessageSquare, Video, Phone, PlusCircle, Search, Bell, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from 'react'


const channels = [
  { id: 1, name: "General", unread: 2 },
  { id: 2, name: "Marketing", unread: 0 },
  { id: 3, name: "Development", unread: 5 },
  { id: 4, name: "Sales", unread: 0 },
  { id: 5, name: "Support", unread: 1 },
];

const contacts = [
  { id: 1, name: "John Doe", status: "online", avatar: "", lastSeen: "Just now" },
  { id: 2, name: "Jane Smith", status: "online", avatar: "", lastSeen: "5m ago" },
  { id: 3, name: "Robert Johnson", status: "offline", avatar: "", lastSeen: "1h ago" },
  { id: 4, name: "Emily Davis", status: "online", avatar: "", lastSeen: "Just now" },
  { id: 5, name: "Michael Wilson", status: "offline", avatar: "", lastSeen: "2h ago" },
];

const messages = [
  { id: 1, sender: "Jane Smith", content: "Good morning team! What's on the agenda for today?", time: "9:30 AM", isMe: false },
  { id: 2, sender: "You", content: "Hi Jane! We need to finalize the project proposal by EOD.", time: "9:32 AM", isMe: true },
  { id: 3, sender: "Robert Johnson", content: "I'll work on the budget section. Should have it ready in a couple of hours.", time: "9:34 AM", isMe: false },
  { id: 4, sender: "You", content: "Sounds good. Let's touch base after lunch to review progress.", time: "9:35 AM", isMe: true },
  { id: 5, sender: "Emily Davis", content: "I've updated the slide deck with the latest figures. Check your email for the link.", time: "9:40 AM", isMe: false },
];

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Communication & Collaboration</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Video className="mr-2 h-4 w-4" />
            Start Meeting
          </Button>
          <Button className="bg-nexus-600 hover:bg-nexus-700">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="files">Shared Files</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <div className="border rounded-lg shadow-sm overflow-hidden">
            <div className="flex h-[calc(80vh-120px)]">
              {/* Sidebar */}
              <div className="w-64 border-r flex flex-col">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." className="pl-8" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto">
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">CHANNELS</h3>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {channels.map((channel) => (
                        <div 
                          key={channel.id} 
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-muted ${channel.id === 3 ? 'bg-muted' : ''}`}
                        >
                          <span># {channel.name}</span>
                          {channel.unread > 0 && (
                            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {channel.unread}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">DIRECT MESSAGES</h3>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {contacts.map((contact) => (
                        <div 
                          key={contact.id} 
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-muted ${contact.id === 1 ? 'bg-muted' : ''}`}
                        >
                          <div className="flex items-center">
                            <div className="relative mr-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {contact.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {contact.status === 'online' && (
                                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></span>
                              )}
                            </div>
                            <span>{contact.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                <div className="p-3 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="font-medium"># Development</div>
                    <Badge variant="outline" className="ml-2">5 members</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${message.isMe ? 'bg-nexus-100 text-nexus-800' : 'bg-muted'} p-3 rounded-lg`}>
                        {!message.isMe && (
                          <div className="font-medium text-sm mb-1">{message.sender}</div>
                        )}
                        <div>{message.content}</div>
                        <div className="text-xs text-muted-foreground mt-1 text-right">{message.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button size="icon" className="bg-nexus-600 hover:bg-nexus-700">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Management</CardTitle>
              <CardDescription>Schedule and manage video conferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Meeting management interface</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for the meeting management interface</p>
                <Button>Schedule Meeting</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Shared Files</CardTitle>
              <CardDescription>Access and manage shared documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">File sharing interface</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for the file sharing interface</p>
                <Button>Upload New File</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Team Calendar</CardTitle>
              <CardDescription>View and manage team events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Team calendar interface</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for the team calendar interface</p>
                <Button>Add Event</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
