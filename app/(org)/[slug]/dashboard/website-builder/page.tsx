
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Layers, LayoutGrid, Code, EyeIcon, Edit, Trash } from "lucide-react";

const templates = [
  { id: 1, name: "Corporate", description: "Professional website for organizations", thumbnail: "bg-gradient-to-r from-blue-400 to-indigo-500" },
  { id: 2, name: "E-commerce", description: "Online store with product listings", thumbnail: "bg-gradient-to-r from-purple-400 to-pink-500" },
  { id: 3, name: "Portfolio", description: "Showcase your work and skills", thumbnail: "bg-gradient-to-r from-green-400 to-cyan-500" },
  { id: 4, name: "Blog", description: "Share your thoughts and content", thumbnail: "bg-gradient-to-r from-orange-400 to-red-500" },
  { id: 5, name: "Landing Page", description: "Conversion-focused single page", thumbnail: "bg-gradient-to-r from-yellow-400 to-amber-500" },
];


const page = () => {
    return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Website Builder</h1>
            <Button className="bg-nexus-600 hover:bg-nexus-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Website
            </Button>
          </div>
    
          <Tabs defaultValue="templates">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Website Templates</CardTitle>
                  <CardDescription>Start with a pre-designed template or create from scratch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="overflow-hidden border">
                        <div className={`${template.thumbnail} h-40 flex items-center justify-center text-white`}>
                          <LayoutGrid size={40} />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="outline" size="sm">Preview</Button>
                          <Button size="sm" className="bg-nexus-600 hover:bg-nexus-700">Use Template</Button>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    <Card className="overflow-hidden border">
                      <div className="bg-muted h-40 flex items-center justify-center">
                        <PlusCircle size={40} className="text-muted-foreground" />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Blank Canvas</CardTitle>
                        <CardDescription>Start from scratch with a blank template</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-end">
                        <Button size="sm" className="bg-nexus-600 hover:bg-nexus-700">Start Empty</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
    
            <TabsContent value="pages">
              <Card>
                <CardHeader>
                  <CardTitle>Website Pages</CardTitle>
                  <CardDescription>Manage and edit your website pages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Home', 'About', 'Services', 'Contact', 'Blog'].map((page, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-card rounded-md border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                            <Layers size={18} />
                          </div>
                          <div>
                            <div className="font-medium">{page}</div>
                            <div className="text-sm text-muted-foreground">/{page.toLowerCase()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" title="Preview">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
    
            <TabsContent value="components">
              <Card>
                <CardHeader>
                  <CardTitle>Website Components</CardTitle>
                  <CardDescription>Reusable elements for building your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Header', 'Footer', 'Navigation', 'Hero Section', 'Testimonials', 'Image Gallery', 'Contact Form', 'FAQ Section', 'Pricing Table'].map((component, i) => (
                      <Card key={i} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <CardTitle className="text-md">{component}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" size="sm">Add to Page</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
    
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Website Settings</CardTitle>
                  <CardDescription>Configure global website settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Site Name</label>
                        <input type="text" className="w-full p-2 border rounded-md" defaultValue="Nexus Corporate Site" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Domain</label>
                        <input type="text" className="w-full p-2 border rounded-md" defaultValue="https://example.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Description</label>
                      <textarea className="w-full p-2 border rounded-md h-20" defaultValue="Professional corporate website powered by Nexus Core"></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
}

export default page