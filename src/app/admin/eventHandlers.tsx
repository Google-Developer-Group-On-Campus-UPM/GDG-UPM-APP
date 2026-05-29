import toast from "react-hot-toast";
import { DataWithId } from "@/constants/types/base.type";
import BaseService from "@/services/firebase/baseService";

const service = new BaseService();

export async function handleDelete(item: DataWithId): Promise<boolean> {
  if (!confirm("Are you sure you want to delete this item?")) return false;

  try {
    if (item.ref) await service.deleteData(item.ref);
    return true;
  } catch (error: any) {
    toast.error("Failed to delete: " + error.message);
    return false;
  }
}
