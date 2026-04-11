"use client";

import { useCallback, useEffect, useState } from "react";
import { Add, Delete } from "@mui/icons-material";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/services/firebase/firebase";

type EditorsManagerProps = {
  role: string;
};

type EditorEntry = {
  id: string;
  email: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EditorsManager({ role }: EditorsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [editors, setEditors] = useState<EditorEntry[]>([]);

  const loadEditors = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, "editors"));
      const items = snap.docs
        .map((editorDoc) => {
          const data = editorDoc.data() as { email?: string };
          return {
            id: editorDoc.id,
            email: (data.email ?? editorDoc.id).toLowerCase(),
          };
        })
        .sort((a, b) => a.email.localeCompare(b.email));

      setEditors(items);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load editors.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEditors();
  }, [loadEditors]);

  if (role !== "admin") {
    return <div className="text-red-500 text-xl font-semibold">Unauthorized</div>;
  }

  const refreshData = async () => {
    setLoading(true);
    await loadEditors();
  };

  const handleAddEditor = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Email is required.");
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);

    try {
      await setDoc(doc(db, "editors", normalizedEmail), {
        email: normalizedEmail,
        createdAt: serverTimestamp(),
      });

      setEmail("");
      toast.success("Editor added successfully.");
      await refreshData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add editor.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEditor = async (editorEmail: string) => {
    if (!confirm(`Remove editor access for ${editorEmail}?`)) return;

    try {
      await deleteDoc(doc(db, "editors", editorEmail));
      toast.success("Editor removed.");
      await refreshData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove editor.");
    }
  };

  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Editors</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add or remove editor access using email addresses.
        </p>
      </div>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="editor@email.com"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-[#026cba] transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          aria-label="Editor email"
        />
        <button
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#026cba] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-[#015b9b] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:hover:bg-sky-400"
          onClick={handleAddEditor}
          disabled={isSaving}
        >
          <Add className="h-4 w-4" />
          Add Editor
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {editors.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No editors added yet.
                </td>
              </tr>
            ) : (
              editors.map((editor) => (
                <tr key={editor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                    {editor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteEditor(editor.email)}
                      className="text-rose-600 hover:cursor-pointer hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
                      aria-label={`Delete ${editor.email}`}
                    >
                      <Delete className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}