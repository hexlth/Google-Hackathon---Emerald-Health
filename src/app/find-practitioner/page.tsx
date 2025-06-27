import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Hospital, User, MapPin, Phone, CheckCircle } from "lucide-react";

// Mock data for practitioners
const practitioners = [
  {
    name: 'Dr. Aoife Murphy',
    specialty: 'General Practitioner',
    address: '123 O\'Connell Street, Dublin 1',
    phone: '+353 1 234 5678',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman doctor',
    plans: ['public', 'medical-card', 'private'],
  },
  {
    name: 'The Fitzwilliam Clinic',
    specialty: 'Cardiology',
    address: '45 Fitzwilliam Square, Dublin 2',
    phone: '+353 1 876 5432',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'building clinic',
    plans: ['private'],
  },
  {
    name: 'Dr. Liam O\'Sullivan',
    specialty: 'General Practitioner',
    address: '78 Pearse Street, Cork',
    phone: '+353 21 456 7890',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'man doctor',
    plans: ['public', 'medical-card'],
  },
  {
    name: 'St. James\'s Hospital',
    specialty: 'Emergency & General Hospital',
    address: 'James\'s Street, Dublin 8',
    phone: '+353 1 410 3000',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'hospital building',
    plans: ['public', 'private'],
  },
  {
    name: 'Dr. Ciara Walsh',
    specialty: 'Pediatrics',
    address: '15 Main Street, Galway',
    phone: '+353 91 789 1234',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman doctor',
    plans: ['public', 'medical-card', 'private'],
  }
];

const planLabels: { [key: string]: string } = {
  public: 'Public Health Service',
  'medical-card': 'Medical Card',
  private: 'Private Insurance'
};

const getIconForSpecialty = (specialty: string) => {
    if (specialty.toLowerCase().includes('hospital')) {
        return <Hospital className="h-6 w-6 text-muted-foreground" />;
    }
    if (specialty.toLowerCase().includes('practitioner')) {
        return <Stethoscope className="h-6 w-6 text-muted-foreground" />;
    }
    return <User className="h-6 w-6 text-muted-foreground" />;
}

export default function FindPractitionerPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline">Find a Medical Practitioner</h1>
        <p className="text-muted-foreground">Search for GPs, clinics, and specialists across Ireland.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Enter your location (e.g., Dublin, Cork)" className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Filter by Health Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="public">Public Health Service</SelectItem>
              <SelectItem value="medical-card">Medical Card</SelectItem>
              <SelectItem value="private">Private Insurance</SelectItem>
            </SelectContent>
          </Select>
          <Button>Search</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practitioners.map((p, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <Avatar className="w-16 h-16 border">
                <AvatarImage src={p.avatar} alt={p.name} data-ai-hint={p.avatarHint} />
                <AvatarFallback>{getIconForSpecialty(p.specialty)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{p.name}</CardTitle>
                <CardDescription>{p.specialty}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <span>{p.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>{p.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                 <CheckCircle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                 <div>
                    <h4 className="font-medium">Plans Accepted</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {p.plans.map(plan => (
                            <Badge key={plan} variant="secondary">{planLabels[plan]}</Badge>
                        ))}
                    </div>
                 </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Ping Practitioner</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
