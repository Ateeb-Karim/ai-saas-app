"use client";

import { signInFormType } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Loader2, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

export default function SigninPage(): JSX.Element {
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<signInFormType>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") setEmailValid(false);

    if (name === "password") setPasswordValid(false);
  };

  const emailChecking = (email: string): boolean => {
    return email.includes("@") && email.includes(".");
  };

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    setEmailValid(false);
    setPasswordValid(false);

    const isEmailValid = emailChecking(formData.email);

    if (!isEmailValid) {
      setEmailValid(true);

      toast.error("Please enter a valid email", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
        duration: 3000,
      });

      return;
    }

    if (!formData.password) {
      setPasswordValid(true);

      toast.error("Please enter your password", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
        duration: 3000,
      });

      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result || result.error) {
        setPasswordValid(true);

        toast.error("Invalid email or password", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          position: "top-center",
          duration: 3000,
        });

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

      setFormData({
        email: "",
        password: "",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Something went wrong. Please try again.", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800/80 bg-[#111522]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
      <div className="mb-7">
        <h2 className="text-xl font-semibold text-white">Welcome back</h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
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
              className={`w-full rounded-lg border ${
                emailValid
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700 focus:ring-blue-500/20"
              } bg-[#0b0f18] py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-all focus:ring-2`}
              required
            />
          </div>
          {emailValid && (
            <p className="text-xs text-red-500">Please enter a valid email</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
          </div>
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
              placeholder="Enter your password"
              className={`w-full rounded-lg border ${
                passwordValid
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-700 focus:ring-blue-500/20"
              } bg-[#0b0f18] py-2.5 pl-10 pr-11 text-sm text-white outline-none transition-all focus:ring-2`}
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
          {passwordValid && (
            <p className="text-xs text-red-500">Invalid credentials</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-800" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
          New to Nexus AI?
        </span>

        <div className="h-px flex-1 bg-gray-800" />
      </div>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-500 transition-colors hover:text-blue-400 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
