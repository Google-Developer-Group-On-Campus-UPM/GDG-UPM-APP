import {
  CollectionReference,
  collection,
  DocumentData,
  DocumentReference,
  QueryConstraint,
  where,
} from "firebase/firestore";
import { Department, Role, TeamMember } from "@/constants/types/team.type";
import BaseService from "../firebase/baseService";
import { db } from "../firebase/firebase";
import { LINKS } from "@/constants/links";

class TeamService extends BaseService {
  usersCollection: CollectionReference<DocumentData>;
  rolesCollection: CollectionReference<DocumentData>;
  departmentsCollection: CollectionReference<DocumentData>;

  constructor() {
    super();
    this.usersCollection = collection(db, "users");
    this.rolesCollection = collection(db, "roles");
    this.departmentsCollection = collection(db, "departments");
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

  async createUser(user: Partial<TeamMember>): Promise<DocumentReference> {
    const defaultUser: TeamMember = {
      name: "gdgoc member",
      role: "member",
      image: "/images/no-pfp.png",
      social: {
        linkedin: LINKS.LINKEDIN,
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

  async updateUser(
    data: Partial<TeamMember>,
    user: DocumentReference,
  ): Promise<boolean> {
    return this.updateData(data, user);
  }

  async updateRole(
    data: Partial<Role>,
    role: DocumentReference,
  ): Promise<boolean> {
    return this.updateData(data, role);
  }

  async updateDepartment(
    data: Partial<Department>,
    department: DocumentReference,
  ): Promise<boolean> {
    return this.updateData(data, department);
  }

  async deleteUser(user: DocumentReference) {
    return this.deleteData(user);
  }

  async deleteRole(role: DocumentReference) {
    return this.deleteData(role);
  }

  async deleteDepartment(department: DocumentReference) {
    return this.deleteData(department);
  }
}

export default TeamService;
