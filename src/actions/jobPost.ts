import { JobPost } from "@/types/jobpost"; // Import your JobPost interface
import { getIdTokenNoParam } from "@/utils";

export async function getJobPosts({
  limit = 10,
  employer_id,
  type_of_work,
}: {
  limit?: number;
  employer_id?: string;
  type_of_work?: string;
}): Promise<JobPost[]> {
  try {
    // Build the query parameters
    const params = new URLSearchParams();

    if (limit) params.append("limit", limit.toString());
    if (employer_id) params.append("employer_id", employer_id);
    if (type_of_work) params.append("type_of_work", type_of_work);

    const idToken = await getIdTokenNoParam();

    // Make the API request
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      }/api/job/all?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch job posts");
    }

    const data = await response.json();
    return data.jobPosts;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
}
