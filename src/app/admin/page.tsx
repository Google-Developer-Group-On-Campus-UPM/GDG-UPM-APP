"use client";

import { DarkMode, LightMode } from "@mui/icons-material";
import { FirebaseError } from "firebase/app";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { auth, db } from "@/services/firebase/firebase";
import AdminSidebar from "./AdminSidebar";
import { type AdminRole, resolveAdminRole } from "./auth";

const DepartmentsManager = dynamic(() => import("./DepartmentsManager"), {
  ssr: false,
});
const EditorsManager = dynamic(() => import("./EditorsManager"), {
  ssr: false,
});
const EventsManager = dynamic(() => import("./EventsManager"), {
  ssr: false,
});
const RolesManager = dynamic(() => import("./RolesManger"), {
  ssr: false,
});
const UsersManager = dynamic(() => import("./UsersManager"), {
  ssr: false,
});

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Sign-in failed. Please try again.";
  }

  switch (error.code) {
    case "auth/popup-closed-by-user":
      return "Sign-in popup was closed before completing authentication.";
    case "auth/popup-blocked":
      return "Popup was blocked by your browser. Allow popups and try again.";
    case "auth/unauthorized-domain":
      return "Current domain is not authorized in Firebase Authentication settings.";
    case "auth/operation-not-allowed":
      return "Google sign-in is not enabled in Firebase Authentication providers.";
    case "auth/network-request-failed":
      return "Network issue detected. Check your internet connection and retry.";
    case "auth/internal-error":
      return "Firebase returned an internal auth error. Check Firebase config env vars and authorized domains.";
    default:
      return `Sign-in failed (${error.code}).`;
  }
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AdminRole | null>(null);
  const [activeSection, setActiveSection] = useState("events");
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("admin-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextIsDarkMode = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDarkMode(nextIsDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("admin-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (!u) {
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        if (!u.email?.trim()) {
          await signOut(auth);
          toast.error("Your Google account email is missing.");
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        const resolvedRole = await resolveAdminRole(db, u.email);

        if (resolvedRole === "admin") {
          setUser(u);
          setRole(resolvedRole);
          setLoading(false);
          return;
        }

        if (resolvedRole === "editor") {
          setUser(u);
          setRole(resolvedRole);
          setLoading(false);
          return;
        }

        // Unauthorized
        await signOut(auth);
        toast.error("Access denied");
        setUser(null);
        setRole(null);
        setLoading(false);
      } catch (error) {
        console.error("Auth state resolution failed", error);
        toast.error("Unable to verify admin access. Please try again.");
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  async function login() {
    try {
      const authDomain = auth.app.options.authDomain;
      const apiKey = auth.app.options.apiKey;
      const projectId = auth.app.options.projectId;

      if (!authDomain || !apiKey || !projectId) {
        toast.error(
          "Firebase client env vars are missing. Check NEXT_PUBLIC_FIREBASE_* values.",
        );
        return;
      }

      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google sign-in failed", error);
      toast.error(getAuthErrorMessage(error));
    }
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setRole(null);
  }

  if (loading)
    return (
      <main className="grid h-screen place-items-center bg-slate-100 dark:bg-slate-950">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading admin panel...
        </p>
      </main>
    );

  if (!user || !role) {
    return (
      <main className="relative flex h-screen items-center justify-center overflow-hidden bg-slate-100 px-6 dark:bg-slate-950">
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-[#026cba]/15 blur-3xl dark:bg-[#026cba]/20" />
        <div className="pointer-events-none absolute -right-10 -bottom-24 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl dark:bg-[#026cba]/20" />
        <Toaster position="top-right" />
        <div className="z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.2em] text-[#026cba] dark:text-sky-300">
            GDG UPM
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Admin CMS
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in with your authorized account to manage events, members, and
            teams.
          </p>
          <button
            onClick={login}
            className="mt-6 w-full rounded-xl bg-[#026cba] px-6 py-3 font-medium text-white transition-colors hover:cursor-pointer hover:bg-[#015b9b] dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    );
  } else
    return (
      <main className="grid min-h-screen grid-cols-[auto_1fr] bg-linear-to-br from-slate-100 via-slate-50 to-sky-50 text-black dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-white">
        <Toaster position="top-right" />
        <AdminSidebar
          logoutAction={logout}
          role={role}
          activeSection={activeSection}
          setActiveSectionAction={setActiveSection}
        ></AdminSidebar>
        <section className="p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div>
              <h2 className="text-lg font-semibold capitalize text-[#026cba] dark:text-sky-300">
                {activeSection}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage content and configuration for the selected module.
              </p>
            </div>

            <button
              onClick={() => setIsDarkMode((value) => !value)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <LightMode className="h-4 w-4" />
              ) : (
                <DarkMode className="h-4 w-4" />
              )}
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
          {activeSection === "events" && (
            <EventsManager role={role}></EventsManager>
          )}
          {activeSection === "members" && (
            <UsersManager role={role}></UsersManager>
          )}
          {activeSection === "roles" && (
            <RolesManager role={role}></RolesManager>
          )}
          {activeSection === "departments" && (
            <DepartmentsManager role={role}></DepartmentsManager>
          )}
          {activeSection === "editors" && (
            <EditorsManager role={role}></EditorsManager>
          )}
        </section>
      </main>
    );
}
