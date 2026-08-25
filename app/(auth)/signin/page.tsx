"use client";

import Link from "next/link";
import { JSX, useState } from "react";

export default function SigninPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="space-y-4 border border-gray-700 p-4 w-full sm:max-w-sm mx-auto rounded-xl shadow-2xl bg-[#111522]">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-center">
          nexus <span className="text-blue-500 uppercase">ai</span>
        </h2>
        <p className="text-sm text-center text-muted-foreground">
          Welcome back — log in to continue
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-500 rounded-md px-3 py-2 outline-none"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 cursor-pointer hover:underline "
          >
            Forgot your password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-500 rounded-md px-3 py-2 outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-center px-4 py-2 rounded-md font-semibold text-white cursor-pointer hover:bg-blue-600 transition-colors duration-200 ease-in-out"
      >
        Sign In
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
