"use client";

import { User } from "firebase/auth";
import { auth} from "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No authenticated user found.");
    
  }

  const idToken = await user.getIdToken(true); 
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


export const getCurrentUser = (): Promise<User | null> => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); 
        resolve(user);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};