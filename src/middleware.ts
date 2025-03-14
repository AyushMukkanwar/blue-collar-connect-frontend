import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/auth", "/community"];
const profileNotRequiredRoutes = [...publicRoutes, "/complete-profile"];

function isPublicRoute(path: string) {
  return publicRoutes.some(route => path === route || path.startsWith("/community/") || path.startsWith("/create-community") || path.startsWith("/chat"));
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname;

  //Allow access to public routes and all `/community` subroutes
  if (isPublicRoute(path)) {
    // If user is authenticated, redirect to dashboard
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Redirect to /auth if not authenticated
  if (!session) {
    const response = NextResponse.redirect(new URL("/auth", request.url));
    response.cookies.delete("session");
    return response;
  }

  // For protected routes, check user profile completion
  if (!profileNotRequiredRoutes.includes(path)) {
    try {
      const userProfileStatus = request.cookies.get("userProfile")?.value;

      // Redirect to complete profile if profile not complete
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
