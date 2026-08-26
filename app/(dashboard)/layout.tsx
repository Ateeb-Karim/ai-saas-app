import React from "react";
import SideBar from "./_components/sidebar";
import Topbar from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#0A0E14]">
      <aside className="w-full flex-none md:block hidden md:w-64 bg-[#12161F] text-[#F5F6F8] shrink-0 flex-col h-screen">
        <SideBar />
      </aside>
      <div className="flex flex-col grow w-full">
        <Topbar />
        <section className="flex flex-col items-center justify-center grow p-6 overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
}
