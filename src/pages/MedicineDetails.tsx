import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Factory, Pill, AlertTriangle, CheckCircle } from "lucide-react";

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock medicine data
  const mockMedicines: Record<string, any> = {
    MED001: {
      name: "Paracetamol 500mg",
      genericName: "Acetaminophen",
      manufacturer: "HealthCorp Pharmaceuticals",
      manufactureDate: "2024-06-15",
      expiryDate: "2026-06-14",
      batchNumber: "PCM24061501",
      status: "valid",
      image: "/placeholder.svg",
      activeIngredients: ["Paracetamol 500mg"],
      inactiveIngredients: ["Microcrystalline cellulose", "Starch", "Magnesium stearate"],
      indications: ["Pain relief", "Fever reduction", "Headache", "Cold and flu symptoms"],
      dosage: {
        adults: "1-2 tablets every 4-6 hours (max 8 tablets per day)",
        children: "Consult healthcare provider for children under 12",
        elderly: "Same as adult dose, consult doctor if over 65"
      },
      sideEffects: ["Rare allergic reactions", "Nausea (uncommon)", "Skin rash (rare)"],
      warnings: ["Do not exceed recommended dose", "Avoid alcohol", "Consult doctor if symptoms persist"]
    },
    MED002: {
      name: "Amoxicillin 250mg",
      genericName: "Amoxicillin",
      manufacturer: "PharmaTech Industries",
      manufactureDate: "2024-08-10",
      expiryDate: "2026-08-09",
      batchNumber: "AMX24081001",
      status: "valid",
      image: "/placeholder.svg",
      activeIngredients: ["Amoxicillin 250mg"],
      inactiveIngredients: ["Lactose", "Magnesium stearate", "Sodium starch glycolate"],
      indications: ["Bacterial infections", "Respiratory tract infections", "Skin infections"],
      dosage: {
        adults: "250-500mg every 8 hours",
        children: "125-250mg every 8 hours (based on weight)",
        elderly: "Same as adult dose with kidney function monitoring"
      },
      sideEffects: ["Diarrhea", "Nausea", "Skin rash", "Allergic reactions"],
      warnings: ["Complete full course", "Inform doctor of penicillin allergies", "Take with food"]
    }
  };

  const medicine = mockMedicines[id || "MED001"] || mockMedicines.MED001;
  const isExpired = new Date(medicine.expiryDate) < new Date();
  const isExpiringSoon = new Date(medicine.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/scan")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Scanner
          </Button>
          <h1 className="text-2xl font-bold text-primary">MEDI SCAN</h1>
          <div></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Medicine Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{medicine.name}</CardTitle>
                  <CardDescription className="text-lg">{medicine.genericName}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {isExpired ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Expired
                    </Badge>
                  ) : isExpiringSoon ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Expires Soon
                    </Badge>
                  ) : (
                    <Badge className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Valid
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Manufacturing Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5" />
                Manufacturing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
                  <p className="text-lg">{medicine.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
                  <p className="text-lg font-mono">{medicine.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manufacture Date</p>
                  <p className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(medicine.manufactureDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expiry Date</p>
                  <p className={`text-lg flex items-center gap-2 ${isExpired ? 'text-destructive' : isExpiringSoon ? 'text-orange-600' : ''}`}>
                    <Calendar className="h-4 w-4" />
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Active Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {medicine.activeIngredients.map((ingredient: string, index: number) => (
                    <Badge key={index} variant="default">{ingredient}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Inactive Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {medicine.inactiveIngredients.map((ingredient: string, index: number) => (
                    <Badge key={index} variant="secondary">{ingredient}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage & Dosage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medicine.indications.map((indication: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      {indication}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dosage Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-sm text-muted-foreground">{medicine.dosage.adults}</p>
                </div>
                <div>
                  <p className="font-medium">Children</p>
                  <p className="text-sm text-muted-foreground">{medicine.dosage.children}</p>
                </div>
                <div>
                  <p className="font-medium">Elderly</p>
                  <p className="text-sm text-muted-foreground">{medicine.dosage.elderly}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warnings & Side Effects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medicine.warnings.map((warning: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{warning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Possible Side Effects</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {medicine.sideEffects.map((effect: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{effect}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;