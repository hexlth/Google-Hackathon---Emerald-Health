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

// Define a type for the profile data to ensure consistency
type UserProfileData = {
  fullName: string;
  gpName: string;
  gpContact: string;
  clinicName: string;
  clinicContact: string;
  gpEmail: string;
  healthPlan: string;
};

const LOCAL_STORAGE_KEY = 'emerald-health-profile';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: "",
    gpName: "",
    gpContact: "",
    clinicName: "",
    clinicContact: "",
    gpEmail: "",
    healthPlan: "public",
  });
  
  // This effect handles authentication check and loading data from localStorage
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    if (user) {
        // Load data from localStorage
        const savedDataRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedDataRaw) {
            const savedData = JSON.parse(savedDataRaw) as UserProfileData;
            setProfileData(savedData);
        } else {
            // If no saved data, initialize full name from auth context
            setProfileData(prev => ({ ...prev, fullName: user.displayName || "" }));
        }
    }
  }, [user, loading, router]);

  const handleInputChange = (field: keyof UserProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Save the current state of profile data to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profileData));
    
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
                  <Input id="name" value={profileData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
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
                  <Input id="gp-name" placeholder="e.g. Dr. Jane Smith" value={profileData.gpName} onChange={(e) => handleInputChange('gpName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gp-contact">GP's Contact Number</Label>
                  <Input id="gp-contact" placeholder="e.g. +353 1 234 5678" value={profileData.gpContact} onChange={(e) => handleInputChange('gpContact', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Preferred Clinic Name</Label>
                  <Input id="clinic-name" placeholder="e.g. The Dublin Clinic" value={profileData.clinicName} onChange={(e) => handleInputChange('clinicName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-contact">Clinic's Contact Number</Label>
                  <Input id="clinic-contact" placeholder="e.g. +353 1 876 5432" value={profileData.clinicContact} onChange={(e) => handleInputChange('clinicContact', e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="gp-email">GP's Email Address</Label>
                  <Input id="gp-email" type="email" placeholder="e.g. dr.jane.smith@health.ie" value={profileData.gpEmail} onChange={(e) => handleInputChange('gpEmail', e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Health Plan</h3>
              <Separator />
              <div className="space-y-2 pt-2">
                <Label htmlFor="health-plan">Select your primary health plan</Label>
                <Select value={profileData.healthPlan} onValueChange={(value) => handleInputChange('healthPlan', value)}>
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
