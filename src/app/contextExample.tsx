// Example usage in a client component
// app/profile/page.tsx
("use client");

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { fetchUserData, logoutUser } from "../../utils/auth";

export default function ProfilePage() {
  const { user, setUser, clearUser } = useUser();
  const router = useRouter();

  // Example: Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user data");
      }
    };

    if (!user) {
      loadUserData();
    }
  }, [user, setUser]);

  // Handle logout
  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      clearUser(); // Clear user data from context
      router.push("/login"); // Redirect to login page
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.emailAddress}</p>
      <p>Role: {user.role}</p>
      {/* Display other user information as needed */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
