"use client";

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import ShowCard from "../../_components/showcard";
import { User, ArrowLeft, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function EditProfilePage(): JSX.Element {
  const { data: session, update } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    const changingPassword =
      formData.password || formData.newPassword || formData.confirmPassword;

    if (changingPassword) {
      if (
        !formData.password ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        console.log(formData, formData.password);
        toast.error("Please fill all password fields");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
    }

    try {
      setLoading(true);
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          currentPassword: formData.password,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.error || "Failed to update profile");
      }
      await update();
      setFormData((prev) => ({
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success(
        changingPassword
          ? "Profile and password updated successfully"
          : "Profile updated successfully",
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <div className="w-full flex items-center justify-between border-b border-[#2A2F3A] pb-5">
        <ShowCard
          icon={<User className="h-6 w-6 text-blue-500" />}
          title="Profile"
          description="Manage your profile and account settings"
        />

        <Link
          href="/profile"
          className="flex items-center gap-2 bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 hover:scale-105 transition-all capitalize"
        >
          <ArrowLeft className="h-4 w-4" />

          <span className="text-sm capitalize">back</span>
        </Link>
      </div>

      <div className="w-full p-5 border border-[#2A2F3A] rounded-lg">
        <div className="w-full flex flex-col border-b border-[#2A2F3A] pb-5">
          <h3 className="text-xl font-bold text-[#F5F6F8]">Edit Profile</h3>

          <p className="text-[#8B93A5] text-sm">
            update your profile information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col mt-2">
          <div className="w-full flex flex-col">
            <label htmlFor="name" className="text-[#F5F6F8] text-lg">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer capitalize outline-none"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label htmlFor="email" className="text-[#F5F6F8] text-lg">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer capitalize outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="text-[#F5F6F8] text-lg">
              Current Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer capitalize outline-none"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer capitalize outline-none"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer capitalize outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex gap-5 mt-5 justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all capitalize"
            >
              {loading ? (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
