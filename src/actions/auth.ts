import { parseResponse } from "@/utils";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

/**
 * Calls the backend API to create a new user.
 */
export async function signUp(email: string, password: string, role: string) {
  try {
    const response = await fetch("http://localhost:8000/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    console.log(data);

    return data; // { message: "User created successfully", uid: "some-unique-uid" }
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

/**
 * Calls the backend API to sign out a user using the provided ID token.
 */
export async function signOut(idToken: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-out`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await parseResponse(res);
    if (!res.ok) {
      throw new Error(data.error || "Failed to sign out");
    }
    return data;
  } catch (error: any) {
    console.error("Sign-out error:", error.message);
    return { error: error.message };
  }
}

/**
 * Handles user login by ensuring the user is signed in via Firebase,
 * retrieving a valid ID token, and then calling the backend API.
 */
export async function signIn(email: string, password: string) {
  try {
    // Sign in with Firebase using the initialized auth instance
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Ensure user is authenticated
    if (!user) {
      throw new Error("User authentication failed.");
    }

    // Get the user's ID token for future use with your backend if needed
    const idToken = await user.getIdToken();

    console.log("Firebase sign-in successful");

    // Return the user and token for use in your application
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
      },
      idToken: idToken,
    };
  } catch (error: any) {
    console.error("Sign-in failed:", error.message);
    return {
      success: false,
      error: error.message || "Unexpected error occurred while signing in",
    };
  }
}

/**
 * Registers a new user by signing them up and immediately signing them in.
 */
export async function register(email: string, password: string, role: string) {
  try {
    // Step 1: Sign up the user on the backend.
    const signUpResponse = await signUp(email, password, role);
    if (signUpResponse.error) {
      return signUpResponse;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Step 2: Immediately log in the user.
    const loginResponse = await signIn(email, password);
    if (loginResponse.error) {
      return loginResponse;
    }
    return { message: "Registration and login successful", ...loginResponse };
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return {
      error: error.message || "Unexpected error occurred during registration",
    };
  }
}
