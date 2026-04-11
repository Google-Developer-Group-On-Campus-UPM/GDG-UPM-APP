"use client";

import { Department } from "@/constants/types/team.type";
import TeamService from "@/services/team/teamService";
import { useState, useEffect, useCallback } from "react";
import { Add, Edit, Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import { handleDelete } from "./eventHandlers";
import { EditDepartmentModal } from "./Modals";

type DepartmentsManagerProps = {
  role: string;
};

const service = new TeamService();

export default function DepartmentsManager({ role }: DepartmentsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const departments = await service.getDepartments();
      setDepartments(departments);
    } catch (error) {
      console.warn(error);
      setError("Failed to load departments. Please try again.");
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

  const handleDeleteAndRefresh = async (department: Department) => {
    await handleDelete(department);
    refreshData();
  };

  const handleSaveDepartment = async (updated: {
    name: string;
    description: string;
  }) => {
    try {
      if (isAdding) {
        await service.createDepartment(updated);
        toast.success("Department created successfully.");
      } else if (selectedDepartment?.ref) {
        await service.updateDepartment(updated, selectedDepartment.ref);
        toast.success("Department updated successfully.");
      }

      setSelectedDepartment(null);
      setIsAdding(false);
      refreshData();
    } catch (error: any) {
      toast.error("Failed to save department: " + error.message);
    }
  };



  if (loading) return <h1 className="text-xl font-semibold">Loading...</h1>;
  if (error)
    return (
      <div className="text-red-500 text-xl">
        {error}
        <button
          onClick={refreshData}
          className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  return (
    <div>
      <div className="flex justify-between items-center mb-4 w-full">
        <h1 className="text-xl font-semibold">Departments</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
          onClick={() => setIsAdding(true)}
          aria-label="Add new department"
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departments.map((department) => (
            <tr key={department.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {department.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {department.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => setSelectedDepartment(department)}
                  className="text-blue-600 hover:text-blue-900 mr-3 hover:cursor-pointer"
                  aria-label={`Edit ${department.name}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAndRefresh(department)}
                  className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                  aria-label={`Delete ${department.name}`}
                >
                  <Delete className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditDepartmentModal
        open={!!selectedDepartment || isAdding}
        onClose={() => {
          setSelectedDepartment(null);
          setIsAdding(false);
        }}
        department={selectedDepartment}
        onSave={handleSaveDepartment}
      />
    </div>
  );
}
