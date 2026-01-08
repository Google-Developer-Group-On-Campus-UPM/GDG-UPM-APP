"use client";

import { Person, Group, Logout, Flag, Event } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

type AdminSidebarProps = {
  logout: () => void;
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
};

export default function AdminSidebar({
  logout,
  activeSection,
  setActiveSection,
}: AdminSidebarProps) {
  return (
    <div className="border-r border-[#bebebe] dark:border-[#505050] h-dvh p-8">
      <nav>
        <ul className="h-max flex flex-col gap-4">
          <li className="hover:bg-[#505050] rounded-xl">
            <button
              className="p-4 w-full flex gap-2 hover:cursor-pointer"
              onClick={logout}
            >
              <Logout className="w-6 h-6" />
              <span>Logout</span>
            </button>
          </li>

          <li
            className={`hover:bg-[#505050] rounded-xl ${activeSection === "events" ? "bg-[#505050]" : ""}`}
          >
            <button
              className="p-4 w-full flex gap-2 hover:cursor-pointer"
              onClick={() => setActiveSection("events")}
            >
              <Event className="w-6 h-6" />
              <span>Events</span>
            </button>
          </li>

          <li
            className={`hover:bg-[#505050] rounded-xl ${activeSection === "members" ? "bg-[#505050]" : ""}`}
          >
            <button
              className="p-4 w-full flex gap-2 hover:cursor-pointer"
              onClick={() => setActiveSection("members")}
            >
              <Person className="w-6 h-6" />
              <span>Members</span>
            </button>
          </li>

          <li
            className={`hover:bg-[#505050] rounded-xl ${activeSection === "roles" ? "bg-[#505050]" : ""}`}
          >
            <button
              className="p-4 w-full flex gap-2 hover:cursor-pointer"
              onClick={() => setActiveSection("roles")}
            >
              <Flag className="w-6 h-6" />
              <span>Roles</span>
            </button>
          </li>

          <li
            className={`hover:bg-[#505050] rounded-xl ${activeSection === "departments" ? "bg-[#505050]" : ""}`}
          >
            <button
              className="p-4 w-full flex gap-2 hover:cursor-pointer"
              onClick={() => setActiveSection("departments")}
            >
              <Group className="w-6 h-6" />
              <span>Departments</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
