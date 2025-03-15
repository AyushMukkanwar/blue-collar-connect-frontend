"use client";

import { User } from "firebase/auth";
import { auth } from "./firebase/config";

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
