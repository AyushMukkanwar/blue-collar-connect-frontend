"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { signIn, signUp, handleGoogleCredential } from "@/firebase/actions"
import { auth } from "@/firebase/config"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = isSignUp ? await signUp(email, password) : await signIn(email, password)

      if (result.error) {
        setError(result.error)
      } else {
        router.push("/complete-profile")
      }
    } catch (error) {
      setError("An unexpected error occurred.")
    }

    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)

    try {
      // Handle Google sign-in on client side first
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      // Get the credential from the sign-in result
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (credential?.idToken) {
        // Send the credential to server action
        const serverResult = await handleGoogleCredential(credential.idToken)

        if (serverResult.error) {
          setError(serverResult.error)
          setLoading(false)
          return
        }

        // Only navigate if there was no error
        router.push("/complete-profile")
      } else {
        setError("Failed to get Google credentials.")
      }
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.")
      console.error("ERROR while signing in with Google: ", error)
    }

    setLoading(false)
  }

  return (
    <div className="px-5 py-8 sm:px-8 w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        <p className="text-gray-600 text-sm">
          {isSignUp ? "Sign up to get started with Blue Collar Connect" : "Sign in to continue to your account"}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center py-6 mb-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <FcGoogle className="mr-2 h-5 w-5" />
        <span className="text-base">Continue with Google</span>
      </Button>

      <div className="flex items-center justify-center mb-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-500">or continue with email</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="py-6 px-4 rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            {!isSignUp && (
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="py-6 px-4 rounded-xl border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-6 rounded-xl text-base font-medium transition-all"
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : isSignUp ? "Create Account" : "Sign In"}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-center text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600">
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
    </div>
  )
}

