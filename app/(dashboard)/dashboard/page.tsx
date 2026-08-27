import { auth } from "@/auth";
import { JSX } from "react/jsx-runtime";
import DashboardCards from "../_components/dashboardCards";
import Activity from "../_components/activity";
import { Code, FileText, Mail } from "lucide-react";

export default async function DashboardPage(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full bg-[#0A0E14] font-sans items-center py-8">
      <div className="w-full max-w-5xl flex flex-col px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col justify-start items-start gap-1 py-6 mt-4 md:mt-8">
          <h1 className="text-[#F5F6F8] text-xl sm:text-2xl font-bold">
            Welcome back,{" "}
            {session?.user?.name
              ? `${session?.user?.name.charAt(0).toUpperCase()}${session?.user?.name.slice(1)}`
              : "User"}
          </h1>
          <p className="text-[#A1A5AE] font-medium text-sm sm:text-base">
            Here's what happening with your workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full py-4">
          <DashboardCards heading="Generations this month" description="12" />
          <DashboardCards heading="Tools used" description="0 / 6" />
          <DashboardCards heading="Current Plan" description="Free" />
        </div>

        <div className="flex flex-col w-full py-4">
          <p className="text-[#A1A5AE] text-sm mb-4">Recent activity</p>
          <div className="flex flex-col gap-2">
            <Activity
              icon={<Code className="text-blue-500 w-5 h-5" />}
              description="Generated a React Component"
              time="5 mins ago"
            />
            <Activity
              icon={<Mail className="text-blue-500 w-5 h-5" />}
              description="Generated Welcome Email"
              time="2 hr ago"
            />
            <Activity
              icon={<FileText className="text-blue-500 w-5 h-5" />}
              description="Summarized 'Q3 report'"
              time="8 hrs ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
