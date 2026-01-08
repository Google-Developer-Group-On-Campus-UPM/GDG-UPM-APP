jest.mock("firebase/app");
jest.mock("firebase/analytics");

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

import TeamService from "@/services/team/teamService";
import {
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { DocumentReference } from "firebase/firestore";

describe("TeamService", () => {
  let service: TeamService;

  beforeEach(() => {
    service = new TeamService();
    jest.clearAllMocks();
  });

  it("should get users", async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        { id: "1", data: () => ({ name: "Alice" }) },
        { id: "2", data: () => ({ name: "Bob" }) },
      ],
    });

    const users = await service.getUsers();
    expect(users).toEqual([
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ]);
    expect(getDocs).toHaveBeenCalled();
  });

  it("should get user by ID", async () => {
    (doc as jest.Mock).mockReturnValue("mockDocRef");
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      id: "123",
      data: () => ({ name: "Charlie" }),
    });

    const result = await service.getById(service.usersCollection, "123");
    expect(result).toEqual({ id: "123", name: "Charlie" });
  });

  it("should return null for non-existent user", async () => {
    (doc as jest.Mock).mockReturnValue("mockDocRef");
    (getDoc as jest.Mock).mockResolvedValue({ exists: () => false });

    const result = await service.getById(
      service.usersCollection,
      "nonexistent",
    );
    expect(result).toBeNull();
  });

  it("should create a user with defaults merged", async () => {
    (addDoc as jest.Mock).mockResolvedValue("mockDocRef");

    const result = await service.createUser({ name: "New Member" });
    expect(addDoc).toHaveBeenCalledWith(
      service.usersCollection,
      expect.objectContaining({
        name: "New Member",
        role: "member",
        isActive: true,
      }),
    );
    expect(result).toBe("mockDocRef");
  });

  it("should update a document", async () => {
    const mockRef = {} as DocumentReference;
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await service.updateData({ name: "Updated" }, mockRef);
    expect(updateDoc).toHaveBeenCalledWith(mockRef, { name: "Updated" });
    expect(result).toBe(true);
  });

  it("should delete all documents in a collection", async () => {
    const mockDocs = [{ ref: "ref1" }, { ref: "ref2" }];
    (getDocs as jest.Mock).mockResolvedValue({ docs: mockDocs });
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await service.deleteAll(service.usersCollection);
    expect(deleteDoc).toHaveBeenCalledTimes(2);
    expect(result).toBe(true);
  });
});
