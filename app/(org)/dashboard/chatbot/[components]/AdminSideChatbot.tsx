'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Sparkles, Settings, MessageSquare, Send, Zap, User, AlertCircle, Save, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Demo chat messages
const demoMessages = [
  { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
  { id: 2, text: "I need help with my account settings.", sender: "user" },
  { id: 3, text: "I'd be happy to help with your account settings. What specific part are you looking to change?", sender: "bot" },
  { id: 4, text: "I want to update my notification preferences.", sender: "user" },
  { id: 5, text: "To update notification preferences, go to Settings > Notifications. There you can toggle email, SMS, and in-app notifications for different events. Would you like me to walk you through the specific steps?", sender: "bot" },
];

const AdminSideChatbot = () => {
  const [messages] = useState(demoMessages);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <Button className="bg-nexus-600 hover:bg-nexus-700">
          <Settings className="mr-2 h-4 w-4" />
          Configure Chatbot
        </Button>
      </div>

      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="help">Help & Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-nexus-100">
                    <AvatarFallback className="bg-nexus-100 text-nexus-600">
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Nexus Assistant</CardTitle>
                    <CardDescription>AI-powered virtual assistant</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col h-[60vh]">
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex gap-3 max-w-[80%]">
                          {message.sender === 'bot' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-nexus-100 text-nexus-600">
                                <Bot size={16} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`p-3 rounded-lg ${
                            message.sender === 'user' 
                              ? 'bg-nexus-100 text-nexus-800' 
                              : 'bg-muted'
                          }`}>
                            <p>{message.text}</p>
                          </div>
                          {message.sender === 'user' && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-3">
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Type your message..." 
                        className="flex-1"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <Button 
                        className="bg-nexus-600 hover:bg-nexus-700" 
                        size="icon"
                        disabled={!inputValue.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Zap className="mr-2 h-4 w-4" />
                    Ask for Help
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Update My Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Report an Issue
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Save className="mr-2 h-4 w-4" />
                    Save this Conversation
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Topics</CardTitle>
                  <CardDescription>Popular questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "How do I reset my password?",
                    "Where can I find my invoices?",
                    "How to create a new project?",
                    "Setting up user permissions"
                  ].map((topic, i) => (
                    <div 
                      key={i} 
                      className="p-2 bg-muted rounded-md text-sm cursor-pointer hover:bg-muted/80"
                    >
                      {topic}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Configuration</CardTitle>
              <CardDescription>Customize AI behavior and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Chatbot Name</label>
                        <Input defaultValue="Nexus Assistant" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Welcome Message</label>
                        <Input defaultValue="Hello! How can I assist you today?" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Fallback Message</label>
                        <Input defaultValue="I'm sorry, I don't understand. Could you rephrase that?" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Model Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Model</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>GPT-4 Turbo</option>
                          <option>GPT-4</option>
                          <option>GPT-3.5 Turbo</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Temperature</label>
                        <Input type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Precise</span>
                          <span>Balanced</span>
                          <span>Creative</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Knowledge Base</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Company Documentation</option>
                          <option>Product Knowledge Base</option>
                          <option>Custom Data</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button className="bg-nexus-600 hover:bg-nexus-700">Save Configuration</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Analytics</CardTitle>
              <CardDescription>Usage statistics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Total Conversations", count: "1,245", icon: MessageSquare },
                    { title: "Avg. Resolution Rate", count: "87%", icon: Sparkles },
                    { title: "Avg. Conversation Time", count: "3m 12s", icon: Bot },
                  ].map((stat, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-md">{stat.title}</CardTitle>
                          <stat.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{stat.count}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center py-6">
                  <h3 className="text-lg font-medium mb-2">Analytics dashboard</h3>
                  <p className="text-muted-foreground mb-4">This is a placeholder for the chatbot analytics dashboard</p>
                  <Button>View Detailed Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help & Guide</CardTitle>
              <CardDescription>Learn how to use and configure the AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Getting Started", description: "Learn the basics of using the chatbot" },
                    { title: "Configuration Guide", description: "How to customize the AI assistant" },
                    { title: "Training the AI", description: "Methods to improve response accuracy" },
                    { title: "Integration APIs", description: "Connect with other systems" },
                  ].map((guide, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          View Guide
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button className="bg-nexus-600 hover:bg-nexus-700">Contact Support</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSideChatbot;
