
"use client";

import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Stethoscope, Hospital, User, MapPin, Phone, CheckCircle, Search, Loader2, AlertCircle } from "lucide-react";

// Mock data for practitioners
const practitioners = [
  {
    name: 'Dr. Aoife Murphy',
    specialty: 'General Practitioner',
    address: '123 O\'Connell Street, Dublin 1',
    phone: '+353 1 234 5678',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'friendly woman doctor',
    plans: ['public', 'medical-card', 'private'],
  },
  {
    name: 'The Fitzwilliam Clinic',
    specialty: 'Cardiology',
    address: '45 Fitzwilliam Square, Dublin 2',
    phone: '+353 1 876 5432',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'modern clinic building',
    plans: ['private'],
  },
  {
    name: 'Dr. Liam O\'Sullivan',
    specialty: 'General Practitioner',
    address: '78 Pearse Street, Cork',
    phone: '+353 21 456 7890',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'smiling man doctor',
    plans: ['public', 'medical-card'],
  },
  {
    name: 'St. James\'s Hospital',
    specialty: 'Emergency & General Hospital',
    address: 'James\'s Street, Dublin 8',
    phone: '+353 1 410 3000',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'large hospital exterior',
    plans: ['public', 'private'],
  },
  {
    name: 'Dr. Ciara Walsh',
    specialty: 'Pediatrics',
    address: '15 Main Street, Galway',
    phone: '+353 91 789 1234',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'pediatrician smiling child',
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
        return <Hospital className="h-5 w-5 text-muted-foreground" />;
    }
    if (specialty.toLowerCase().includes('practitioner')) {
        return <Stethoscope className="h-5 w-5 text-muted-foreground" />;
    }
    return <User className="h-5 w-5 text-muted-foreground" />;
}

export default function FindPractitionerPage() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleFindNearMe = () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    if (navigator.geolocation) {
      // Simulate a delay for fetching location
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, you would use these coordinates to fetch nearby practitioners
            console.log("Lat:", position.coords.latitude, "Lng:", position.coords.longitude);
            setIsLoadingLocation(false);
            // Here you would filter or re-fetch practitioners based on location
          },
          (error) => {
            setLocationError("Could not access your location. Please enable location permissions in your browser settings.");
            setIsLoadingLocation(false);
          }
        );
      }, 1500);
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 h-[calc(100vh-4rem)]">
      {/* Left Panel: Search and List */}
      <div className="md:col-span-4 lg:col-span-4 xl:col-span-3 border-r flex flex-col">
        <div className="p-4 space-y-4 border-b">
          <h1 className="text-2xl font-bold font-headline">Find Care</h1>
          <div className="flex gap-2">
            <Input placeholder="Search location or practitioner" className="flex-1" />
            <Button variant="outline"><Search className="w-4 h-4" /></Button>
          </div>
          <Button className="w-full" onClick={handleFindNearMe} disabled={isLoadingLocation}>
            {isLoadingLocation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="mr-2 h-4 w-4" />
            )}
            Find Near Me
          </Button>
          {locationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Location Error</AlertTitle>
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {practitioners.map((p, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border">
                            <AvatarImage src={p.avatar} alt={p.name} data-ai-hint={p.avatarHint} />
                            <AvatarFallback>{getIconForSpecialty(p.specialty)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-base">{p.name}</CardTitle>
                            <CardDescription className="text-xs">{p.specialty}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{p.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{p.phone}</span>
                  </div>
                   <div className="flex flex-wrap gap-1 pt-2">
                        {p.plans.map(plan => (
                            <Badge key={plan} variant="secondary" className="text-xs">{planLabels[plan]}</Badge>
                        ))}
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Map */}
      <div className="hidden md:block md:col-span-8 lg:col-span-8 xl:col-span-9 relative bg-gray-200">
         <Image
            src="https://placehold.co/1600x1200.png"
            layout="fill"
            objectFit="cover"
            alt="Map showing practitioner locations"
            data-ai-hint="ireland map"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </div>
  )
}

    