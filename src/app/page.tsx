"use client";
import { useUser } from "@/context/userContext";
import { useJobPosts } from "@/hooks/jobPostHook";

export default function Home() {
  // In a real app, you would get the user type from your auth system
  const { user } = useUser();
  const userType = user?.role;
  const { jobPosts, loading, error } = useJobPosts({
    limit: 10,
    // Optional: Pass other parameters as needed
    // employer_id: 'some-employer-id',
    // type_of_work: 'full-time'
  });

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Hello {user?.firstName}</h1>
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
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Job Listings</h1>
          {jobPosts.length === 0 ? (
            <p>No job posts found.</p>
          ) : (
            <ul className="space-y-2">
              {jobPosts.map((job) => (
                <li key={job.id} className="p-4 border rounded">
                  <h2 className="font-semibold">{job.job_title}</h2>
                  <p>{job.employer_name || "Unknown employer"}</p>
                  <p>{job.type_of_work}</p>
                  {job.location?.city && <p>Location: {job.location.city}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
