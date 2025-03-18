import { NavigationBar } from "@/components/Nav-bar";

export default function Home() {
  // In a real app, you would get the user type from your auth system
  const userType = "worker"; // or "employer"

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Blue Collar Connect</h1>
        <p className="mb-8">Welcome to your dashboard</p>

        {/* Example content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Recent Jobs</h2>
            <p className="text-muted-foreground">
              View your recent job applications
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Upcoming Shifts</h2>
            <p className="text-muted-foreground">
              Check your upcoming work schedule
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
