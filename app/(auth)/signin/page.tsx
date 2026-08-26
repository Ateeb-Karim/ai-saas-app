"use client";

import { signInFormType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function SigninPage(): JSX.Element {
  const router = useRouter();

  const [formData, setFormData] = useState<signInFormType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (!result?.ok) {
      toast.error("Invalid credentials", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
        duration: 3000,
      });
      setFormData({ email: "", password: "" });
      return;
    }

    toast.success("Login successful", {
      icon: "✅",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
      position: "top-center",
      duration: 3000,
    });

    router.push("/dashboard");
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
    </form>
  );
}
