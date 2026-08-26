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
      <SideBar />
      <div className="flex flex-col grow w-full">
        <Topbar />
        <section className="flex flex-col items-center justify-center grow p-6 overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
}
