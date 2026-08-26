import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = !!auth?.user;
      const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      const isAuthRoute =
        request.nextUrl.pathname.startsWith("/signin") ||
        request.nextUrl.pathname.startsWith("/signup");

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", request.url));
        }
        return true;
      }

      if (isDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/signin", request.url));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
