import { doc, Firestore, getDoc } from "firebase/firestore";

export type AdminRole = "admin" | "editor";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function hasRoleDocument(
  firestore: Firestore,
  collectionName: "admins" | "editors",
  email: string,
) {
  const normalizedEmail = normalizeEmail(email);
  const trimmedEmail = email.trim();

  try {
    const primarySnap = await getDoc(doc(firestore, collectionName, normalizedEmail));
    if (primarySnap.exists()) {
      return true;
    }

    if (trimmedEmail !== normalizedEmail) {
      const fallbackSnap = await getDoc(doc(firestore, collectionName, trimmedEmail));
      return fallbackSnap.exists();
    }

    return false;
  } catch (error) {
    const firestoreError = error as { code?: string };
    if (firestoreError.code === "permission-denied") {
      return false;
    }

    throw error;
  }
}

export async function resolveAdminRole(
  firestore: Firestore,
  email: string,
): Promise<AdminRole | null> {
  if (!email.trim()) {
    return null;
  }

  if (await hasRoleDocument(firestore, "admins", email)) {
    return "admin";
  }

  if (await hasRoleDocument(firestore, "editors", email)) {
    return "editor";
  }

  return null;
}