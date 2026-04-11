import { DataWithId } from "@/constants/types/base.type";
import BaseService from "@/services/firebase/baseService";
import toast from "react-hot-toast";

const service = new BaseService();

export async function handleDelete(item: DataWithId) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    if (item.ref) await service.deleteData(item.ref);
  } catch (error: any) {
    toast.error("Failed to delete: " + error.message);
  }
}
