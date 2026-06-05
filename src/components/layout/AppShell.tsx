"use client";

import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Full-width Navbar */}
      <Navbar variant="full-width" />

      {/* Main Content Area */}
      {/* pt-20 (80px) offsets the fixed navbar so content starts below it */}
      <main className="flex-1 w-full pt-20 flex flex-col">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
