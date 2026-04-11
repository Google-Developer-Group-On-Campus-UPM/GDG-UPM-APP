"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/services/firebase/firebase";
import { db } from "@/services/firebase/firebase";
import { Toaster, toast } from "react-hot-toast";
import AdminSidebar from "./AdminSidebar";
import EventsManager from "./EventsManager";
import UsersManager from "./UsersManager";
import RolesManager from "./RolesManger";
import DepartmentsManager from "./DepartmentsManager";

type Role = "admin" | "editor";

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
  const [role, setRole] = useState<Role | null>(null);
  const [activeSection, setActiveSection] = useState("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (!u) {
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        // Admin?
        const adminSnap = await getDoc(doc(db, "admins", u.email!));
        if (adminSnap.exists()) {
          setUser(u);
          setRole("admin");
          setLoading(false);
          return;
        }

        // Editor?
        const editorSnap = await getDoc(doc(db, "editors", u.email!));
        if (editorSnap.exists()) {
          setUser(u);
          setRole("editor");
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
        toast.error("Firebase client env vars are missing. Check NEXT_PUBLIC_FIREBASE_* values.");
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

  if (loading) return <p>Loading...</p>;

  if (!user || !role) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Toaster position="top-right" />
        <button
          onClick={login}
          className="bg-blue-700 text-white px-6 py-3 rounded hover:cursor-pointer"
        >
          Sign in with Google
        </button>
      </main>
    );
  } else
    return (
      <main className="grid grid-cols-[auto_1fr] bg-[#f4f3f2] dark:bg-[#222222] text-black dark:text-white">
        <Toaster position="top-right" />
        <AdminSidebar
          logoutAction={logout}
          activeSection={activeSection}
          setActiveSectionAction={setActiveSection}
        ></AdminSidebar>
        <div className="p-8">
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
        </div>
      </main>
    );
}
