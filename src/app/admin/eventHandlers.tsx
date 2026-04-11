import { DataWithId } from "@/constants/types/base.type";
import { Department } from "@/constants/types/team.type";
import BaseService from "@/services/firebase/baseService";
import TeamService from "@/services/team/teamService";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";

type BasicModalProps = {
  open: boolean;
  onClose: () => void;
  type: string;
  department?: Department | null;
  isAdding?: boolean;
  onSave?: () => void;
};

const service = new BaseService();
const teamService = new TeamService();

export async function handleDelete(item: DataWithId) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    if (item.ref) await service.deleteData(item.ref);
  } catch (error: any) {
    toast.error("Failed to delete: " + error.message);
  }
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#333333",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function BasicModal({ open, onClose, type, department, isAdding, onSave }: BasicModalProps) {
  const [name, setName] = React.useState(department?.name || "");
  const [description, setDescription] = React.useState(department?.description || "");

  React.useEffect(() => {
    setName(department?.name || "");
    setDescription(department?.description || "");
  }, [department]);

  const handleSave = async () => {
    try {
      if (type === "departments") {
        if (isAdding) {
          await teamService.createDepartment({ name, description });
        } else if (department?.ref) {
          await teamService.updateDepartment({ name, description }, department.ref);
        }
      }
      onSave?.();
      onClose();
    } catch (error: any) {
      toast.error("Failed to save: " + error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isAdding ? "Add" : "Edit"} {type}
        </Typography>
        <Grid container spacing={2} columns={2} sx={{ mt: 2 }}>
          <Grid>
            <Typography className="flex items-center h-full">Name</Typography>
          </Grid>
          <Grid>
            <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          <Grid>
            <Typography className="flex items-center h-full">Description</Typography>
          </Grid>
          <Grid>
            <TextField value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}
