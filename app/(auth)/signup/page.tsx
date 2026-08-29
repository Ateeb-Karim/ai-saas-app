"use client";

import { SignupFormType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { JSX } from "react/jsx-runtime";

export default function SignupPage(): JSX.Element {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border border-gray-700 p-4 w-full sm:max-w-sm mx-auto rounded-xl shadow-2xl bg-[#111522]"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-center">
          nexus <span className="text-blue-500 uppercase">ai</span>
        </h2>
        <p className="text-sm text-center text-muted-foreground">
          Create account
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border border-gray-500 rounded-md px-3 py-2 outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border border-gray-500 rounded-md px-3 py-2 outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full border border-gray-500 rounded-md px-3 py-2 outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-center px-4 py-2 rounded-md font-semibold text-white cursor-pointer hover:bg-blue-600 transition-colors duration-200 ease-in-out"
      >
        Sign Up
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
