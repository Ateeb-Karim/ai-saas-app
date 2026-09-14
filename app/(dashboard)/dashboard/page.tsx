"use client";

import { useEffect, useState } from "react";
import { JSX } from "react";
import { useSession } from "next-auth/react";
import DashboardCards from "../_components/dashboardCards";
import Activity from "../_components/activity";
import {
  Code,
  FileText,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  Newspaper,
} from "lucide-react";
import { getHistory } from "@/lib/history";
import { HistoryEntry } from "@/types/types";
import { formatDistanceToNow } from "date-fns";

const toolIconMap: Record<string, JSX.Element> = {
  "code-generator": <Code className="text-blue-500 w-5 h-5" />,
  "email-generator": <Mail className="text-blue-500 w-5 h-5" />,
  summarizer: <FileText className="text-blue-500 w-5 h-5" />,
  chat: <MessageSquare className="text-blue-500 w-5 h-5" />,
  "image-generator": <ImageIcon className="text-blue-500 w-5 h-5" />,
  "blog-generator": <Newspaper className="text-blue-500 w-5 h-5" />,
};

export default function DashboardPage(): JSX.Element {
  const { data: session } = useSession();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const history = getHistory();
    setHistory(history);
  }, []);

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentCount = history.filter(
    (entry) => new Date(entry.timestamp).getTime() >= thirtyDaysAgo,
  ).length;

  const toolsUsed = new Set(history.map((entry) => entry.tool)).size;

  const recentActivity = [...history]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 5);

  const displayName = session?.user?.name
    ? `${session.user.name.charAt(0).toUpperCase()}${session.user.name.slice(1)}`
    : "User";

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full bg-[#0A0E14] font-sans items-center py-8">
      <div className="w-full max-w-5xl flex flex-col px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col justify-start items-start gap-1 py-6 mt-4 md:mt-8">
          <h1 className="text-[#F5F6F8] text-xl sm:text-2xl font-bold">
            Welcome back, {displayName}
          </h1>
          <p className="text-[#8B93A5] font-medium text-sm sm:text-base">
            Here's what happening with your workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full py-4">
          <DashboardCards
            heading="Generations this month"
            description={`${recentCount}`}
          />
          <DashboardCards
            heading="Tools used"
            description={`${toolsUsed} / 6`}
          />
          <DashboardCards heading="Current Plan" description="Free" />
        </div>

        <div className="flex flex-col w-full py-4">
          <p className="text-[#8B93A5] text-sm mb-4">Recent activity</p>
          <div className="flex flex-col gap-2">
            {recentActivity.length === 0 ? (
              <p className="text-[#8B93A5] text-sm">No activity yet.</p>
            ) : (
              recentActivity.map((entry) => (
                <Activity
                  key={entry.id}
                  icon={
                    toolIconMap[entry.tool] || (
                      <FileText className="text-blue-500 w-5 h-5" />
                    )
                  }
                  description={entry.title}
                  time={formatDistanceToNow(new Date(entry.timestamp), {
                    addSuffix: true,
                  })}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
