"use client";

import { Role } from "@/constants/types/team.type";
import TeamService from "@/services/team/teamService";
import { useState, useEffect, useCallback } from "react";
import { Add, Edit, Delete } from "@mui/icons-material";
import { handleDelete, BasicModal } from "./eventHandlers";

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

  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="text-xl font-semibold">Roles</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
          onClick={() => setIsAdding(true)}
          aria-label="Add new role"
        >
          <Add className="w-5 h-5"></Add>
          Add New
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {role.title.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {role.title}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium hover:cursor-pointer">
                <button
                  onClick={() => setSelectedRole(role)}
                  className="text-blue-600 hover:text-blue-900 mr-3 hover:cursor-pointer"
                  aria-label={`Edit ${role.title}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAndRefresh(role)}
                  className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                  aria-label={`Delete ${role.title}`}
                >
                  <Delete className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BasicModal
        open={!!selectedRole || isAdding}
        onClose={() => {
          setSelectedRole(null);
          setIsAdding(false);
        }}
        type={"roles"}
        roleItem={selectedRole}
        isAdding={isAdding}
        onSave={refreshData}
      />
    </div>
  );
}
