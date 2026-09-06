import { JSX } from "react";
import ShowCard from "../_components/showcard";
import { Pencil, User } from "lucide-react";
import { auth } from "@/auth";

export default async function ProfilePage(): Promise<JSX.Element> {
  const session = await auth();
  return (
    <div className="flex flex-col gap-5 items-start w-full h-full text-[#F5F6F8] px-4 sm:px-0">
      <ShowCard
        icon={<User className="h-6 w-6 text-blue-500" />}
        title="Profile"
        description="Manage your profile and account settings"
      />
      <div className="w-full flex items-center justify-between border-b border-[#2a2a2a] pb-5">
        <div className="flex items-center gap-5">
          <div className="w-15 h-15 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl border-2 border-blue-400">
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-[#F5F6F8] text-xl font-medium">
              {session?.user?.name
                ? `${session.user.name.charAt(0).toUpperCase()}${session.user.name.slice(1)}`
                : "User"}
            </p>
            <p className="text-[#F5F6F8] text-sm">{session?.user?.email}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#12161F] border border-[#2a2a2a] px-3 py-2 rounded-md cursor-pointer hover:border-[#007bff] hover:text-[#007bff] hover:scale-105 transition-all capitalize">
          <Pencil className="h-4 w-4" />
          <span className="text-[#F5F6F8] text-sm">edit profile</span>
        </button>
      </div>
    </div>
  );
}
