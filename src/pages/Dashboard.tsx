import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Package, Edit, ArrowLeft, Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  // Mock inventory data
  const [inventory, setInventory] = useState([
    {
      id: "MED001",
      name: "Paracetamol 500mg",
      manufacturer: "HealthCorp Pharmaceuticals",
      batchNumber: "PCM24061501",
      stock: 150,
      manufactureDate: "2024-06-15",
      expiryDate: "2026-06-14",
      status: "In Stock"
    },
    {
      id: "MED002",
      name: "Amoxicillin 250mg",
      manufacturer: "PharmaTech Industries",
      batchNumber: "AMX24081001",
      stock: 75,
      manufactureDate: "2024-08-10",
      expiryDate: "2026-08-09",
      status: "Low Stock"
    },
    {
      id: "MED003",
      name: "Ibuprofen 400mg",
      manufacturer: "MediCore Labs",
      batchNumber: "IBU24071201",
      stock: 200,
      manufactureDate: "2024-07-12",
      expiryDate: "2026-07-11",
      status: "In Stock"
    },
    {
      id: "MED004",
      name: "Aspirin 325mg",
      manufacturer: "CardioPharm Inc",
      batchNumber: "ASP24051801",
      stock: 25,
      manufactureDate: "2024-05-18",
      expiryDate: "2025-12-18",
      status: "Critical"
    },
    {
      id: "MED005",
      name: "Cetirizine 10mg",
      manufacturer: "AllergyTech Solutions",
      batchNumber: "CET24090301",
      stock: 300,
      manufactureDate: "2024-09-03",
      expiryDate: "2027-09-02",
      status: "In Stock"
    }
  ]);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "default";
      case "Low Stock": return "secondary";
      case "Critical": return "destructive";
      default: return "default";
    }
  };

  const updateStock = (id: string, newStock: number) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id 
          ? { 
              ...item, 
              stock: newStock,
              status: newStock === 0 ? "Out of Stock" : newStock < 50 ? "Critical" : newStock < 100 ? "Low Stock" : "In Stock"
            }
          : item
      )
    );
    toast({ title: "Stock updated", description: `Stock level updated successfully` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-primary">MEDI SCAN Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem("userType");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Medicines</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.length}</div>
              <p className="text-xs text-muted-foreground">Active inventory items</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventory.reduce((sum, item) => sum + item.stock, 0)}</div>
              <p className="text-xs text-muted-foreground">Units in stock</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {inventory.filter(item => item.status === "Low Stock").length}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {inventory.filter(item => item.status === "Critical").length}
              </div>
              <p className="text-xs text-muted-foreground">Urgent restock needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Inventory Management
            </CardTitle>
            <CardDescription>
              Monitor and update medicine stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medicines, manufacturers, or batch numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Medicine
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.manufacturer}</TableCell>
                    <TableCell className="font-mono text-sm">{item.batchNumber}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${item.stock < 50 ? 'text-destructive' : item.stock < 100 ? 'text-orange-600' : ''}`}>
                        {item.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(item.status) as any}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedMedicine(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Stock</DialogTitle>
                            <DialogDescription>
                              Update stock level for {selectedMedicine?.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="currentStock">Current Stock</Label>
                              <Input
                                id="currentStock"
                                type="number"
                                defaultValue={selectedMedicine?.stock}
                                onChange={(e) => {
                                  if (selectedMedicine) {
                                    const newStock = parseInt(e.target.value) || 0;
                                    updateStock(selectedMedicine.id, newStock);
                                  }
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Manufacture Date</Label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedMedicine && new Date(selectedMedicine.manufactureDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <Label>Expiry Date</Label>
                                <p className="text-sm text-muted-foreground">
                                  {selectedMedicine && new Date(selectedMedicine.expiryDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;