import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan as ScanIcon, Camera, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Scan = () => {
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock QR codes for testing
  const mockQRCodes = [
    "MED001", "MED002", "MED003", "MED004", "MED005"
  ];

  const simulateQRScan = () => {
    setScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomMedicine = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
      setScanning(false);
      toast({ title: "QR Code Scanned!", description: `Medicine code: ${randomMedicine}` });
      navigate(`/medicine/${randomMedicine}`);
    }, 2000);
  };

  const handleManualEntry = () => {
    const randomMedicine = mockQRCodes[Math.floor(Math.random() * mockQRCodes.length)];
    navigate(`/medicine/${randomMedicine}`);
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
          <h1 className="text-2xl font-bold text-primary">MEDI SCAN</h1>
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

        <div className="max-w-md mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <ScanIcon className="h-6 w-6 text-primary" />
                Scan Medicine QR Code
              </CardTitle>
              <CardDescription>
                Align the QR code within the frame to get instant medicine details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mock Camera View */}
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {scanning ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-sm text-muted-foreground">Scanning...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Camera view</p>
                    </div>
                  )}
                </div>
                
                {/* Scanning overlay */}
                <div className="absolute inset-4 border-2 border-primary rounded-lg opacity-50">
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-primary rounded-br-lg"></div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={simulateQRScan} 
                  disabled={scanning}
                  className="w-full"
                  size="lg"
                >
                  {scanning ? "Scanning..." : "Start Scanning"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleManualEntry}
                  className="w-full"
                >
                  Try Demo Medicine
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Hold your device steady and ensure good lighting for best results</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scan;