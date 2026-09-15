"use client";

import { signInFormType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import bcrypt from "bcryptjs";
import { Loader2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default function SigninPage(): JSX.Element {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<signInFormType>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const EmailChecking = (email: string): boolean => {
    return email.includes("@") && email.includes(".");
  };

  const PasswordChecking = async (password: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: {
        email: formData.email,
      },
    });

    if (!user || !user.password) return false;

    const passwordMatch = await bcrypt.compare(password, user.password);

    return passwordMatch;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isEmailValid: boolean = EmailChecking(formData.email);

      if (!isEmailValid) {
        toast.error("Invalid email", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });

        setEmailValid((prev) => !prev);
        setFormData({ email: "", password: "" });
        return;
      }

      const isPasswordCorrect = await PasswordChecking(formData.password);

      if (!isPasswordCorrect) {
        console.log(isPasswordCorrect);
        toast.error("Invalid password", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });

        setPasswordValid((prev) => !prev);
        setFormData({ email: "", password: "" });

        return;
      }

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

      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to log in", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
        duration: 3000,
      });
    }
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
          className={`w-full border ${emailValid ? "border-red-500" : "border-gray-500"} rounded-md px-3 py-2 outline-none`}
          required
        />
        {emailValid && (
          <p className="text-sm text-center text-red-500">
            Please enter a valid email
          </p>
        )}
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
          className={`w-full border ${passwordValid ? "border-red-500" : "border-gray-500"} rounded-md px-3 py-2 outline-none`}
          required
        />
        {passwordValid && (
          <p className="text-sm text-center text-red-500">
            Invalid credentials
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isloading}
        className="w-full bg-blue-500 text-center px-4 py-2 rounded-md font-semibold text-white cursor-pointer hover:bg-blue-600 transition-colors duration-200 ease-in-out flex items-center justify-center gap-2 active:scale-95"
      >
        {isloading ? (
          <>
            <Loader2 className="animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
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
