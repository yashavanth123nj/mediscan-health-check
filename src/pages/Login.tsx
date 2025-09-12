import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock credentials for testing
  const mockCredentials = {
    public: { email: "user@mediscan.com", password: "user123" },
    pharmacy: { email: "pharmacy@mediscan.com", password: "pharmacy123" }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === mockCredentials.public.email && password === mockCredentials.public.password) {
      localStorage.setItem("userType", "public");
      toast({ title: "Login successful", description: "Welcome to MEDI SCAN" });
      navigate("/scan");
    } else if (email === mockCredentials.pharmacy.email && password === mockCredentials.pharmacy.password) {
      localStorage.setItem("userType", "pharmacy");
      toast({ title: "Login successful", description: "Welcome to MEDI SCAN Dashboard" });
      navigate("/dashboard");
    } else {
      toast({ 
        title: "Login failed", 
        description: "Invalid credentials. Use demo accounts provided.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">MEDI SCAN</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-muted-foreground">
              <p><strong>Public User:</strong> user@mediscan.com / user123</p>
              <p><strong>Pharmacy Staff:</strong> pharmacy@mediscan.com / pharmacy123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;