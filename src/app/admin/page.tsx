"use client";

import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "@/services/firebase/firebase";
import { db } from "@/services/firebase/firebase";
import AdminSidebar from "./AdminSidebar";
import EventsManager from "./EventsManager";
import UsersManager from "./UsersManager";
import RolesManager from "./RolesManger";
import DepartmentsManager from "./DepartmentsManager";

type Role = "admin" | "editor";

const provider = new GoogleAuthProvider();

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [activeSection, setActiveSection] = useState("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
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
      alert("Access denied");
    });

    return () => unsub();
  }, []);

  async function login() {
    await signInWithPopup(auth, provider);
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
        <button
          onClick={login}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Sign in with Google
        </button>
      </main>
    );
  } else
    return (
      <main className="grid grid-cols-[auto_1fr] bg-[#f4f3f2] dark:bg-[#222222] text-black dark:text-white">
        <AdminSidebar
          logout={logout}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
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
