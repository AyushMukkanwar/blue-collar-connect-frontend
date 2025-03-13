// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/auth"];
const profileNotRequiredRoutes = [...publicRoutes, "/complete-profile"];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;

  // Allow access to public routes
  if (publicRoutes.includes(path)) {
    // If user is authenticated, redirect to dashboard
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Check authentication
  if (!session) {
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("session");
    return response;
  }

  // For protected routes, verify user profile status
  if (!profileNotRequiredRoutes.includes(path)) {
    try {
      // Get idToken from cookie
      const userProfileStatus = request.cookies.get("userProfile")?.value;

      // If profile is not complete, redirect to complete profile
      if (!userProfileStatus) {
        return NextResponse.redirect(new URL("/complete-profile", request.url));
      }
    } catch (error) {
      console.error("Profile check error:", error);
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
