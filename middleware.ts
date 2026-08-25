import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/dashboard/:path*"],
};
