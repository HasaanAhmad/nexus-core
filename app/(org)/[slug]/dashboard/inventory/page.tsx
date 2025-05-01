
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, MoreHorizontal, Package, TrendingDown, TrendingUp, AlertCircle, ScanBarcode } from "lucide-react";

const products = [
  { 
    id: 1, 
    name: "Ergonomic Office Chair", 
    sku: "FRN-001", 
    category: "Furniture", 
    stock: 24, 
    price: 199.99, 
    status: "In Stock" 
  },
  { 
    id: 2, 
    name: "Wireless Mouse", 
    sku: "TECH-102", 
    category: "Electronics", 
    stock: 45, 
    price: 29.99, 
    status: "In Stock" 
  },
  { 
    id: 3, 
    name: "Standing Desk", 
    sku: "FRN-022", 
    category: "Furniture", 
    stock: 12, 
    price: 349.99, 
    status: "In Stock" 
  },
  { 
    id: 4, 
    name: "4K Monitor", 
    sku: "TECH-054", 
    category: "Electronics", 
    stock: 3, 
    price: 299.99, 
    status: "Low Stock" 
  },
  { 
    id: 5, 
    name: "Wireless Keyboard", 
    sku: "TECH-108", 
    category: "Electronics", 
    stock: 0, 
    price: 59.99, 
    status: "Out of Stock" 
  },
];

const lowStockItems = [
  { id: 4, name: "4K Monitor", sku: "TECH-054", stock: 3, threshold: 5 },
  { id: 6, name: "Desk Lamp", sku: "LIGHT-023", stock: 4, threshold: 10 },
  { id: 7, name: "Laptop Stand", sku: "ACC-017", stock: 2, threshold: 5 },
];

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button className="bg-nexus-600 hover:bg-nexus-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Products</CardTitle>
            <CardDescription>Available inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-muted-foreground" />
              <div className="text-3xl font-bold">243</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Low Stock</CardTitle>
            <CardDescription>Items below threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-amber-500" />
              <div className="text-3xl font-bold">18</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Out of Stock</CardTitle>
            <CardDescription>Items to reorder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
              <div className="text-3xl font-bold">7</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inventory Value</CardTitle>
            <CardDescription>Total current value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              <div className="text-3xl font-bold">$98,432</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Manage your product catalog and stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-9 pr-4 py-2 w-80 rounded-md border"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ScanBarcode className="mr-2 h-4 w-4" />
                    Scan Barcode
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
                      <TableHead>Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className={
                              product.status === "In Stock" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              product.status === "Low Stock" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : 
                              "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {product.stock} {product.status}
                          </Badge>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Manage product organization and classification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Electronics', 'Furniture', 'Office Supplies', 'Stationery', 'Peripherals', 'Networking'].map((category, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{category}</CardTitle>
                      <CardDescription>{12 + i * 3} products</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">View Items</Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="bg-muted/20 border-dashed">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Add Category</CardTitle>
                    <CardDescription>Create a new product category</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex items-center justify-center">
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Category
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-center">Current Stock</TableHead>
                      <TableHead className="text-center">Threshold</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            {item.stock}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{item.threshold}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Reorder</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <TableRow key={`outofstock-${i}`}>
                        <TableCell className="font-medium">{i === 0 ? "Wireless Keyboard" : "Desk Organizer"}</TableCell>
                        <TableCell>{i === 0 ? "TECH-108" : "ORG-056"}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            0
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{i === 0 ? 5 : 3}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Reorder</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Manage inventory reordering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">Purchase orders management</h3>
                <p className="text-muted-foreground mb-4">This is a placeholder for the purchase orders management interface</p>
                <Button>Create Purchase Order</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
