"use client";

import { Add, Delete, Edit } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Department, Role, TeamMember } from "@/constants/types/team.type";
import TeamService from "@/services/team/teamService";
import { handleDelete } from "./eventHandlers";
import { EditUserModal } from "./Modals";

type UsersManagerProps = {
  role: string;
};

const service = new TeamService();

export default function UsersManager({ role }: UsersManagerProps) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<TeamMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const users = await service.getUsers();
      const departments = await service.getDepartments();
      const roles = await service.getRoles();
      setUsers(users);
      setDepartments(departments);
      setRoles(roles);
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
    return (
      <div className="text-red-500 text-xl font-semibold">Unauthorized</div>
    );
  }

  const refreshData = () => {
    setLoading(true);
    loadData();
  };

  const handleDeleteAndRefresh = async (user: TeamMember) => {
    const deleted = await handleDelete(user);
    if (deleted) refreshData();
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Users
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Review and update member profiles.
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl bg-[#026cba] px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-[#015b9b] dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
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
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="max-h-[68vh] overflow-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#026cba]/10 font-medium text-[#026cba] dark:bg-[#026cba]/20 dark:text-sky-200">
                        {user.name ? user.name.charAt(0) : "_"}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {user.currentDepartmentID
                      ? (departments.find(
                          (dept) => dept.id === user.currentDepartmentID,
                        )?.name ?? "")
                      : "None"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
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
                      className="mr-3 text-[#026cba] hover:cursor-pointer hover:text-[#015b9b] dark:text-sky-300 dark:hover:text-sky-200"
                      aria-label={`Edit ${user.name ?? "user"}`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAndRefresh(user)}
                      className="text-rose-600 hover:cursor-pointer hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
                      aria-label={`Delete ${user.name ?? "user"}`}
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditUserModal
        open={!!selectedUser}
        user={selectedUser}
        roles={roles}
        departments={departments}
        onClose={() => {
          setSelectedUser(null);
          setIsAdding(false);
        }}
        onSave={handleSaveUser}
      />
    </div>
  );
}
