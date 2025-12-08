import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  DocumentData,
  CollectionReference,
  WithFieldValue,
  DocumentReference,
  query,
  QueryConstraint,
  where,
} from "firebase/firestore";

import { DataWithId } from "@/constants/types/base.type";

class BaseService {
  async getData(
    collection: CollectionReference<DocumentData>,
    constraints: QueryConstraint[] = [],
  ): Promise<DataWithId[]> {
    try {
      const q = constraints.length
        ? query(collection, ...constraints)
        : collection;

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataWithId[];
    } catch (error) {
      console.error("Failed to get documents:", error);
      throw error;
    }
  }

  async getById<T>(
    collection: CollectionReference<T>,
    id: string,
  ): Promise<(T & { id: string }) | null> {
    try {
      const docRef = doc(collection, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
      console.error("Failed to get document by ID:", error);
      throw error;
    }
  }

  async createData<T extends DocumentData>(
    data: WithFieldValue<T>,
    collection: CollectionReference<T>,
  ): Promise<DocumentReference<T>> {
    try {
      return await addDoc(collection, data);
    } catch (error) {
      console.error("Failed to create document:", error);
      throw error;
    }
  }

  async updateData<T>(
    data: Partial<T>,
    documentReference: DocumentReference<T>,
  ): Promise<boolean> {
    try {
      await updateDoc(documentReference, data);
      return true;
    } catch (error) {
      console.error("Failed to update document:", error);
      throw error;
    }
  }

  async setData<T extends DocumentData>(
    data: WithFieldValue<T>,
    documentReference: DocumentReference<T>,
  ): Promise<boolean> {
    try {
      await setDoc(documentReference, data);
      return true;
    } catch (error) {
      console.error("Failed to update document:", error);
      throw error;
    }
  }

  async deleteData(documentReference: DocumentReference): Promise<boolean> {
    try {
      await deleteDoc(documentReference);
      return true;
    } catch (error) {
      console.error("Failed to delete document:", error);
      throw error;
    }
  }

  async deleteAll(collectionReference: CollectionReference): Promise<boolean> {
    try {
      const documents = (await getDocs(collectionReference)).docs;
      await Promise.all(documents.map((doc) => deleteDoc(doc.ref)));
      return true;
    } catch (error) {
      console.error("Failed to delete all documents:", error);
      throw error;
    }
  }
}

export default BaseService;
