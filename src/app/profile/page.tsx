import ProfileForm from "@/components/ui/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Complete Your Profile
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Tell us more about yourself to get started
        </p>
        <div className="flex justify-center">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
