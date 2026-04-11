"use client";

import { TeamMember, Department } from "@/constants/types/team.type";
import TeamService from "@/services/team/teamService";
import { useState, useEffect, useCallback } from "react";
import { Add, Edit, Delete } from "@mui/icons-material";
import { handleDelete } from "./eventHandlers";
import { EditUserModal } from "./Modals";
import toast from "react-hot-toast";

type UsersManagerProps = {
  role: string;
};

const service = new TeamService();

export default function UsersManager({ role }: UsersManagerProps) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<TeamMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const users = await service.getUsers();
      const departments = await service.getDepartments();
      setUsers(users);
      setDepartments(departments);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (role !== "admin" && role !== "editor") {
    return <div className="text-red-500 text-xl font-semibold">Unauthorized</div>;
  }

  const refreshData = () => {
    setLoading(true);
    loadData();
  };

  const handleDeleteAndRefresh = async (user: TeamMember) => {
    await handleDelete(user);
    refreshData();
  };

  const handleSaveUser = async (updatedUser: TeamMember) => {
    try {
      const { id, ref, ...userData } = updatedUser;

      if (isAdding) {
        await service.createUser(userData);
        toast.success("User created successfully.");
      } else if (ref) {
        await service.updateUser(userData, ref);
        toast.success("User updated successfully.");
      }

      setSelectedUser(null);
      setIsAdding(false);
      refreshData();
    } catch (error: any) {
      toast.error("Failed to save user: " + error.message);
    }
  };

  const emptyUser: TeamMember = {
    name: "",
    role: "member",
    image: "/images/no-pfp.png",
    interest: "",
    social: {
      linkedin: "",
    },
    isActive: true,
  };

  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="text-xl font-semibold">Users</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
          onClick={() => {
            setSelectedUser(emptyUser);
            setIsAdding(true);
          }}
          aria-label="Add new user"
        >
          <Add className="w-5 h-5"></Add>
          Add New
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {user.name ? user.name.charAt(0) : "_"}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.currentDepartmentID
                  ? (departments.find(
                      (dept) => dept.id === user.currentDepartmentID,
                    )?.name ?? "")
                  : "None"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsAdding(false);
                  }}
                  className="text-blue-600 hover:text-blue-900 mr-3 hover:cursor-pointer"
                  aria-label={`Edit ${user.name ?? "user"}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAndRefresh(user)}
                  className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                  aria-label={`Delete ${user.name ?? "user"}`}
                >
                  <Delete className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditUserModal
        open={!!selectedUser}
        user={selectedUser}
        onClose={() => {
          setSelectedUser(null);
          setIsAdding(false);
        }}
        onSave={handleSaveUser}
      />
    </div>
  );
}
