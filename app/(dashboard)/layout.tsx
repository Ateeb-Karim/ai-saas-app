import React from "react";
import SideBar from "./sidebar/page";
import Navbar from "./navbar/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-50">
      <SideBar />
      <div className="flex flex-col grow w-full">
        <Navbar />
        <section className="flex flex-col items-center justify-center grow p-6 overflow-y-auto">
          {children}
        </section>
      </div>
    </main>
  );
}
