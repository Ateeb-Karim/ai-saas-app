"use client";

import { SignupFormType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { JSX } from "react/jsx-runtime";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles, User } from "lucide-react";

export default function SignupPage(): JSX.Element {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // UI only
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      toast.error("Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
        duration: 3000,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      return;
    }

    router.push("/signin");
  };

  return (
    <div className="rounded-2xl border border-gray-800/80 bg-[#111522]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white">
          Create your account
        </h2>
        <p className="text-sm text-gray-500">
          Join Nexus AI and start exploring intelligent tools.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Full name
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-700 bg-[#0b0f18] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-700 bg-[#0b0f18] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-700 bg-[#0b0f18] py-2.5 pl-10 pr-11 text-sm text-white outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-300"
          >
            Confirm password
          </label>
          <div className="relative">
            <LockKeyhole
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-700 bg-[#0b0f18] py-2.5 pl-10 pr-11 text-sm text-white outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/20 active:scale-[0.98]"
        >
          Create Account
        </button>
      </form>
      <div className="my-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-800" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
          Already a member?
        </span>
        <div className="h-px flex-1 bg-gray-800" />
      </div>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-medium text-blue-500 transition-colors hover:text-blue-400 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
