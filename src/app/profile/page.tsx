"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [gpName, setGpName] = useState("");
  const [gpContact, setGpContact] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicContact, setClinicContact] = useState("");
  const [gpEmail, setGpEmail] = useState("");
  const [healthPlan, setHealthPlan] = useState("public");

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      setFullName(user.displayName || "");
      // In a real app, you would fetch and set the other user details from your database.
    }
  }, [user, loading, router]);

  const handleSaveChanges = () => {
    // In a real app, you would save this data to your database (e.g., Firestore).
    console.log("Saving data:", {
      fullName,
      gpName,
      gpContact,
      clinicName,
      clinicContact,
      gpEmail,
      healthPlan,
    });
    toast({
      title: "Profile Saved!",
      description: "Your information has been updated successfully.",
    });
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto py-10">
        <Card className="max-w-4xl mx-auto shadow-md">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary/20">
              <AvatarImage src={user.photoURL || "https://placehold.co/100x100.png"} alt="User avatar" data-ai-hint="user profile photo" />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl">Your Profile</CardTitle>
            <CardDescription>Keep your information up-to-date for a seamless experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={user.email || ""} disabled />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Emergency & GP Details</h3>
              <p className="text-sm text-muted-foreground">This information helps us connect you with care quickly when needed.</p>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="gp-name">Your GP's Name</Label>
                  <Input id="gp-name" placeholder="e.g. Dr. Jane Smith" value={gpName} onChange={(e) => setGpName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gp-contact">GP's Contact Number</Label>
                  <Input id="gp-contact" placeholder="e.g. +353 1 234 5678" value={gpContact} onChange={(e) => setGpContact(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Preferred Clinic Name</Label>
                  <Input id="clinic-name" placeholder="e.g. The Dublin Clinic" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-contact">Clinic's Contact Number</Label>
                  <Input id="clinic-contact" placeholder="e.g. +353 1 876 5432" value={clinicContact} onChange={(e) => setClinicContact(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="gp-email">GP's Email Address</Label>
                  <Input id="gp-email" type="email" placeholder="e.g. dr.jane.smith@health.ie" value={gpEmail} onChange={(e) => setGpEmail(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Health Plan</h3>
              <Separator />
              <div className="space-y-2 pt-2">
                <Label htmlFor="health-plan">Select your primary health plan</Label>
                <Select value={healthPlan} onValueChange={setHealthPlan}>
                  <SelectTrigger id="health-plan" className="w-full md:w-1/2">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public Health Service</SelectItem>
                    <SelectItem value="medical-card">Medical Card</SelectItem>
                    <SelectItem value="private">Private Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
