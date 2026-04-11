"use client";

import { Add, Delete, Edit } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Department } from "@/constants/types/team.type";
import TeamService from "@/services/team/teamService";
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
		return (
			<div className="text-red-500 text-xl font-semibold">Unauthorized</div>
		);
	}

	const refreshData = () => {
		setLoading(true);
		loadData();
	};

	const handleDeleteAndRefresh = async (department: Department) => {
		const deleted = await handleDelete(department);
		if (deleted) refreshData();
	};

	const handleSaveDepartment = async (updated: {
		id: string;
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
			<div className="rounded-2xl border border-[#026cba]/20 bg-[#026cba]/10 p-4 text-[#026cba] dark:border-[#026cba]/30 dark:bg-[#026cba]/10 dark:text-sky-200">
				{error}
				<button
					onClick={refreshData}
					className="ml-4 rounded-lg bg-[#026cba] px-3 py-1 text-white hover:cursor-pointer hover:bg-[#015b9b] dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
				>
					Retry
				</button>
			</div>
		);
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
			<div className="mb-5 flex w-full items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
						Departments
					</h1>
					<p className="text-sm text-slate-500 dark:text-slate-400">
						Organize members by team and specialty.
					</p>
				</div>
				<button
					className="flex items-center gap-2 rounded-xl bg-[#026cba] px-4 py-2 text-white transition-colors hover:cursor-pointer hover:bg-[#015b9b] dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
					onClick={() => setIsAdding(true)}
					aria-label="Add new department"
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
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
						{departments.map((department) => (
							<tr
								key={department.id}
								className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#026cba]/10 font-medium text-[#026cba] dark:bg-[#026cba]/20 dark:text-sky-200">
											{department.name.charAt(0)}
										</div>
										<div className="ml-4">
											<div className="text-sm font-medium text-slate-900 dark:text-slate-100">
												{department.name}
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										onClick={() => setSelectedDepartment(department)}
										className="mr-3 text-[#026cba] hover:cursor-pointer hover:text-[#015b9b] dark:text-sky-300 dark:hover:text-sky-200"
										aria-label={`Edit ${department.name}`}
									>
										<Edit className="w-4 h-4" />
									</button>
									<button
										onClick={() => handleDeleteAndRefresh(department)}
										className="text-rose-600 hover:cursor-pointer hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300"
										aria-label={`Delete ${department.name}`}
									>
										<Delete className="w-4 h-4" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
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
