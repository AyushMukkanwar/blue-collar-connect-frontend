"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn, signUp, handleGoogleCredential } from "@/firebase/actions";
import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      // Handle Google sign-in on client side first
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Get the credential from the sign-in result
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential?.idToken) {
        // Send the credential to server action
        const serverResult = await handleGoogleCredential(credential.idToken);

        if (serverResult.error) {
          setError(serverResult.error);
          setLoading(false);
          return;
        }

        // Only navigate if there was no error
        router.push("/complete-profile");
      } else {
        setError("Failed to get Google credentials.");
      }
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("ERROR while signing in with Google: ", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-8">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {isSignUp ? "Create an Account" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      <div className="my-4 flex items-center justify-center">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <span className="text-xs text-center text-gray-500 uppercase px-2">
          or
        </span>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <FcGoogle className="mr-2" />
        Sign {isSignUp ? "up" : "in"} with Google
      </Button>
      {error && (
        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
      )}
      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="font-medium text-blue-600 hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
