"use client";

import { Person, Group, Logout, Flag, Event } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

type AdminSidebarProps = {
  logoutAction: () => void;
  activeSection: string;
  setActiveSectionAction: Dispatch<SetStateAction<string>>;
};

export default function AdminSidebar({
  logoutAction,
  activeSection,
  setActiveSectionAction,
}: AdminSidebarProps) {
  const navItems = [
    { key: "events", label: "Events", icon: Event },
    { key: "members", label: "Members", icon: Person },
    { key: "roles", label: "Roles", icon: Flag },
    { key: "departments", label: "Departments", icon: Group },
  ] as const;

  return (
    <aside className="h-dvh w-70 border-r border-slate-200 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mb-6 rounded-2xl border border-[#026cba]/20 bg-linear-to-br from-[#026cba] to-[#014b7f] p-4 text-white shadow-lg shadow-[#026cba]/20 dark:border-[#026cba]/30 dark:from-[#026cba] dark:to-[#013a63]">
        <p className="text-xs uppercase tracking-[0.18em] text-sky-100">Control Center</p>
        <h1 className="mt-1 text-lg font-semibold">GDG CMS</h1>
      </div>

      <nav className="flex h-[calc(100%-96px)] flex-col justify-between">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.key;

            return (
              <li key={item.key}>
                <button
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:cursor-pointer ${
                    active
                      ? "bg-[#026cba] text-white shadow-lg shadow-[#026cba]/25 dark:bg-sky-500 dark:text-white"
                      : "text-slate-600 hover:bg-sky-50 hover:text-[#026cba] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-sky-300"
                  }`}
                  onClick={() => setActiveSectionAction(item.key)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-[#026cba]/20 bg-sky-50 px-4 py-3 text-[#026cba] transition-colors hover:cursor-pointer hover:bg-sky-100 dark:border-[#026cba]/30 dark:bg-[#026cba]/10 dark:text-sky-200 dark:hover:bg-[#026cba]/20"
          onClick={logoutAction}
        >
          <Logout className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
}
