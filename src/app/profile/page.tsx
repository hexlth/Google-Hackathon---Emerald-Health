import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person face" />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">Your Profile</CardTitle>
              <CardDescription>Manage your personal and health information.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gp-name">GP Name</Label>
                <Input id="gp-name" placeholder="Dr. Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gp-contact">GP Contact Number</Label>
                <Input id="gp-contact" placeholder="+353 1 234 5678" />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Clinic Name</Label>
                <Input id="clinic-name" placeholder="The Dublin Clinic" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic-contact">Clinic Contact Number</Label>
                <Input id="clinic-contact" placeholder="+353 1 876 5432" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Health Plan</h3>
            <div className="space-y-2">
              <Label htmlFor="health-plan">Select your primary health plan</Label>
              <Select defaultValue="public">
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

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
