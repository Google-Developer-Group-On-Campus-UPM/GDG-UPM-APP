import { db } from "../firebase/firebase";
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

import {
  DataWithId,
  TeamMember,
  Role,
  Department,
} from "@/constants/types/team.type";

class TeamService {
  usersCollection: CollectionReference<DocumentData>;
  rolesCollection: CollectionReference<DocumentData>;
  departmentsCollection: CollectionReference<DocumentData>;

  constructor() {
    this.usersCollection = collection(db, "users");
    this.rolesCollection = collection(db, "roles");
    this.departmentsCollection = collection(db, "departments");
  }

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

  async getUsers(query?: QueryConstraint[]): Promise<TeamMember[]> {
    try {
      return (await this.getData(this.usersCollection, query)) as TeamMember[];
    } catch (error) {
      console.error("Failed to get users: ", error);
      throw error;
    }
  }

  async getActiveUsers(active: boolean): Promise<TeamMember[]> {
    try {
      return await this.getUsers([where("isActive", "==", active)]);
    } catch (error) {
      console.error("Failed to get active users: ", error);
      throw error;
    }
  }

  async getUsersByDepartment(department: string): Promise<TeamMember[]> {
    try {
      return await this.getUsers([where("departmentID", "==", department)]);
    } catch (error) {
      console.error("Failed to get users by department: ", error);
      throw error;
    }
  }

  async getRoles(query?: QueryConstraint[]): Promise<Role[]> {
    try {
      return (await this.getData(this.rolesCollection, query)) as Role[];
    } catch (error) {
      console.error("Failed to get roles: ", error);
      throw error;
    }
  }

  async getDepartments(query?: QueryConstraint[]): Promise<Department[]> {
    try {
      return (await this.getData(
        this.departmentsCollection,
        query,
      )) as Department[];
    } catch (error) {
      console.error("Failed to get departments: ", error);
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

  async createUser(user: Partial<TeamMember>): Promise<DocumentReference> {
    const defaultUser: TeamMember = {
      name: "gdgoc member",
      role: "member",
      image: "/images/no-pfp.png",
      social: {
        linkedin:
          "https://www.linkedin.com/company/google-developer-groups-upm/",
      },
      interest:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis nesciunt dolores quisquam suscipit sapiente illo illum, rem saepe ullam vitae eligendi corrupti voluptate officiis aspernatur, sequi velit omnis reiciendis iusto?",
      isActive: true,
    };

    const finalUser: TeamMember = {
      ...defaultUser,
      ...user,
    };
    return this.createData(finalUser, this.usersCollection);
  }

  async createRole(role: Partial<Role>): Promise<DocumentReference> {
    return this.createData(role, this.rolesCollection);
  }

  async createDepartment(
    department: Partial<Department>,
  ): Promise<DocumentReference> {
    return this.createData(department, this.departmentsCollection);
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

export default TeamService;
