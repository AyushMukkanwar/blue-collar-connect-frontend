"use client";

import { getIdTokenNoParam, getUID } from "@/utils";

export async function getUserProfile() {
  const idToken = await getIdTokenNoParam();
  const userId = await getUID();

  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!idToken) {
    throw new Error("Authentication token is required");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    console.log("response = ", response);

    // Special handling for 404 - profile doesn't exist yet
    if (response.status === 404) {
      console.log("Profile doesn't exist (404 response)");
      return { profileExists: false };
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    const profileData = await response.json();
    return { profileExists: true, profile: profileData };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}
