import { JSX } from "react";
import Link from "next/link";
import ShowCard from "../_components/showcard";
import { Pencil, User } from "lucide-react";
import { auth } from "@/auth";

function formatName(name?: string | null): string {
  if (!name) return "User";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function ProfilePage(): Promise<JSX.Element> {
  const session = await auth();
  const displayName = formatName(session?.user?.name);

  return (
    <div className="flex flex-col gap-5 items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<User className="h-6 w-6 text-blue-500" />}
        title="Profile"
        description="Manage your profile and account settings"
      />
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2F3A] pb-5">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg sm:text-xl border-2 border-blue-400">
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="text-[#F5F6F8] text-lg sm:text-xl font-medium truncate">
              {displayName}
            </p>
            <p className="text-[#8B93A5] text-sm truncate">
              {session?.user?.email || "No email on file"}
            </p>
          </div>
        </div>
        <Link
          href="/profile/edit"
          className="flex items-center justify-center gap-2 bg-[#12161F] border border-[#2A2F3A] px-3 py-2 rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 hover:scale-105 transition-all capitalize w-full sm:w-auto"
        >
          <Pencil className="h-4 w-4" />
          <span className="text-sm">edit profile</span>
        </Link>
      </div>
    </div>
  );
}
