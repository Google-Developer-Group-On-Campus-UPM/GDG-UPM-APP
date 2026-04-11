"use client";

import { Role } from "@/constants/types/team.type";
import TeamService from "@/services/team/teamService";
import { useState, useEffect, useCallback } from "react";
import { Add, Edit, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import { handleDelete } from "./eventHandlers";
import { EditRoleModal } from "./Modals";

type RolesManagerProps = {
  role: string;
};

const service = new TeamService();

export default function RolesManager({ role }: RolesManagerProps) {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const roles = await service.getRoles();
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
    return <div className="text-red-500 text-xl font-semibold">Unauthorized</div>;
  }

  const refreshData = () => {
    setLoading(true);
    loadData();
  };

  const handleDeleteAndRefresh = async (roleItem: Role) => {
    await handleDelete(roleItem);
    refreshData();
  };

  const handleSaveRole = async (updated: { title: string }) => {
    try {
      if (isAdding) {
        await service.createRole({ title: updated.title });
        toast.success("Role created successfully.");
      } else if (selectedRole?.ref) {
        await service.updateRole({ title: updated.title }, selectedRole.ref);
        toast.success("Role updated successfully.");
      }

      setSelectedRole(null);
      setIsAdding(false);
      refreshData();
    } catch (error: any) {
      toast.error("Failed to save role: " + error.message);
    }
  };

  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Roles</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage role definitions for members.</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl bg-[#026cba] px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-[#015b9b] dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
          onClick={() => setIsAdding(true)}
          aria-label="Add new role"
        >
          <Add className="w-5 h-5"></Add>
          Add New
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#026cba]/10 font-medium text-[#026cba] dark:bg-[#026cba]/20 dark:text-sky-200">
                    {role.title.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {role.title}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium hover:cursor-pointer">
                <button
                  onClick={() => setSelectedRole(role)}
                  className="mr-3 text-[#026cba] hover:cursor-pointer hover:text-[#015b9b] dark:text-sky-300 dark:hover:text-sky-200"
                  aria-label={`Edit ${role.title}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAndRefresh(role)}
                  className="text-rose-600 hover:cursor-pointer hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
                  aria-label={`Delete ${role.title}`}
                >
                  <Delete className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <EditRoleModal
        open={!!selectedRole || isAdding}
        onClose={() => {
          setSelectedRole(null);
          setIsAdding(false);
        }}
        roleItem={selectedRole}
        onSave={handleSaveRole}
      />
    </div>
  );
}
