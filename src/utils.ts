"use client";

import { User } from "firebase/auth";
import { auth } from "./firebase/config";

export async function parseResponse(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn("Unable to parse JSON response, returning raw text:", text);
    return text;
  }
}

export async function getValidIdToken(user: User): Promise<string> {
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  const idToken = await user.getIdToken(true); // Force refresh to ensure freshness
  if (!idToken) {
    throw new Error("Failed to retrieve ID token.");
  }

  return idToken;
}

export async function getIdTokenNoParam(): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No authenticated user found.");
  }

  const idToken = await user.getIdToken(true); // Force refresh to ensure freshness
  if (!idToken) {
    throw new Error("Failed to retrieve ID token.");
  }

  return idToken;
}

export const getUID = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("Failed to retrieve UID.");
  }

  return uid;
};

export async function getUserInfo(idToken: string) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

    const res = await fetch(`${backendUrl}/api/auth/sign-in`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        Accept: "application/json",
      },
    });
    const data = await parseResponse(res);
    if (!res.ok) {
      throw new Error(data.error || "Failed to sign in");
    }
    return data;
  } catch (error: any) {
    console.error("Backend sign in error:", error.message);
    return { error: error.message };
  }
}
