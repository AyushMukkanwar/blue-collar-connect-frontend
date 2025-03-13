"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function CompleteProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    jobRole: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    bio: "",
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Here you would typically:
      // 1. Upload the profile picture to storage
      // 2. Save the user data to your database
      // For now, we'll just log and redirect

      console.log("Form data:", formData);
      console.log("Profile picture:", profilePicture);

      // Redirect to home page after successful submission
      router.push("/");
    } catch (error) {
      setError("Failed to complete profile. Please try again.");
      console.error("Error completing profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            name="gender"
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="jobRole">Job Role</Label>
          <Input
            id="jobRole"
            name="jobRole"
            type="text"
            required
            value={formData.jobRole}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input
            id="profilePicture"
            name="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Complete Profile"
          )}
        </Button>
      </form>
    </div>
  );
}
