import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan, Shield, Users, ArrowRight, CheckCircle, Smartphone, Database } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">MEDI SCAN</h1>
          <Button onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Health, Verified
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scan medicine QR codes instantly to get comprehensive information about your medications. 
            Stay informed, stay safe.
          </p>
          
          {/* How It Works */}
          <Card className="bg-card/60 backdrop-blur-sm border-2 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Scan className="h-6 w-6" />
                How Our System Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">1. Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your device camera to scan the QR code on medicine packaging
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">2. Get Instant Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Access comprehensive medicine information including dosage, ingredients, and warnings
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">3. Stay Informed</h3>
                  <p className="text-sm text-muted-foreground">
                    Make informed decisions about your health with verified, up-to-date information
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" onClick={() => navigate("/login")} className="mb-16">
            Start Scanning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose MEDI SCAN?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Enhanced Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Verify medicine authenticity and check expiry dates to ensure you're taking safe, effective medications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  Reduced Errors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Minimize medication errors with accurate dosage information and comprehensive ingredient lists.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Consumer Empowerment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Make informed healthcare decisions with instant access to detailed medicine information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-accent" />
                  Real-time Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access up-to-date information about medicines, including current stock levels and batch details.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Supply Chain Transparency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track medicines from manufacturer to consumer, ensuring transparency in the pharmaceutical supply chain.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Quality Assurance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Verify medicine quality and authenticity, protecting consumers from counterfeit products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="bg-card/40 backdrop-blur-sm border-y">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">About MEDI SCAN</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Our mission is to empower both consumers and healthcare providers with accurate, 
              real-time medicine information. By bridging the gap between pharmaceutical manufacturers 
              and end users, we create a safer, more transparent healthcare ecosystem.
            </p>
            <p className="text-muted-foreground">
              MEDI SCAN combines cutting-edge QR code technology with comprehensive database management 
              to deliver instant medicine verification and detailed information access. Whether you're 
              a consumer checking your medication or a pharmacy managing inventory, MEDI SCAN provides 
              the tools you need for informed healthcare decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 MEDI SCAN. Empowering healthcare through technology.</p>
      </footer>
    </div>
  );
};

export default Index;
