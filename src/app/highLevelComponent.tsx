"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { Loader2 } from "lucide-react";
import { getAndSetUserInfo } from "@/userContextUtils";

interface AuthStateManagerProps {
  children: React.ReactNode;
}

export default function AuthStateManager({ children }: AuthStateManagerProps) {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getAndSetUserInfo(setUser);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        // On error, ensure user context is cleared
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [setUser]);

  // You can optionally add a loading state or just return children immediately
  // Returning children immediately means your UI will render before auth check completes
  return <>{isLoading ? <Loader2 className="animate-spin" /> : children}</>;
}
