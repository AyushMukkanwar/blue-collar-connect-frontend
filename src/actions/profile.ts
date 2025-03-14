// app/actions/profile.ts
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getAuth } from "firebase/auth"
import {db} from "@/firebase/config"


// Function to check if user profile exists
export async function checkUserProfile() {
  try {
    const sessionCookie = (await cookies()).get("session")?.value
    
    if (!sessionCookie) {
      return { error: "No authenticated user" }
    }
    
    // Verify the session cookie
    const userId = getAuth().currentUser?.uid
    
    // Check if profile exists in Firestore
    const userDoc = await db.collection("users").doc(userId).get()
    
    if (!userDoc.exists) {
      return { error: "Profile not found" }
    }
    
    const userData = userDoc.data()
    return { data: userData }
  } catch (error) {
    console.error("Error checking user profile:", error)
    return { error: "Failed to fetch profile" }
  }
}

// Function to create or update user profile
export async function createUserProfile(profileData:any) {
  try {
    const sessionCookie = await cookies()
    const sessioncookie = sessionCookie.get("session")?.value
    
    if (!sessioncookie) {
      return { error: "No authenticated user" }
    }
    
    // Verify the session cookie
    const userId = getAuth().currentUser?.uid
    alert(db)
    
    // Create or update the user's profile
    await db.collection("users").doc(userId).set({
      ...profileData,
      updatedAt: new Date().toISOString(),
    }, { merge: true })
    
    return { success: true }
  } catch (error) {
    console.error("Error creating user profile:", error)
    return { error: "Failed to create profile" }
  }
}

// Middleware function to protect routes
export async function requireProfile() {
  const profileResult = await checkUserProfile()
  
  if (profileResult.error) {
    // Redirect to profile completion page if no profile exists
    redirect("/complete-profile")
  }
  
  return profileResult.data
}

// Function to check profile and redirect appropriately
export async function checkProfileAndRedirect() {
  const sessionCookie = await cookies()
  const sessioncookie = sessionCookie.get("session")?.value
  if (!sessioncookie) {
    redirect("/auth")
  }
  
  try {
    const profileResult = await checkUserProfile()
    
    if (profileResult.error) {
      // No profile exists, redirect to complete profile
      redirect("/complete-profile")
    } else {
      // Profile exists, redirect to main page
      redirect("/dashboard")
    }
  } catch (error) {
    console.error("Error in profile redirect:", error)
    redirect("/auth")
  }
}