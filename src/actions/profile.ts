"use server";

import { getIdTokenNoParam } from "@/utils";

export async function getUserProfile(uid: string) {
  try {
    // Step 1: Get a fresh ID token from the client
    const idToken = await getIdTokenNoParam();

    // Step 2: Make API request to backend
    const backendUrl = `http://localhost:8000/api/user/profile/${uid}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return { noProfile: true }; // Custom response to indicate missing profile
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user profile from backend.");
    }

    const data = await response.json();
    return { noProfile: false, profile: data }; // Successful response
  } catch (error: any) {
    console.error("Error fetching user profile:", error.message);
    return { error: error.message };
  }
}
