import { DataWithId } from "@/constants/types/base.type";
import BaseService from "@/services/firebase/baseService";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";

type BasicModalProps = {
  open: boolean;
  onClose: () => void;
  type: string;
};

const service = new BaseService();

export async function handleDelete(item: DataWithId) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    if (item.ref) service.deleteData(item.ref);
  } catch (error: any) {
    alert("Failed to delete: " + error.message);
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

export function BasicModal({ open, onClose, type }: BasicModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit {type}
        </Typography>
        <Grid container spacing={2} columns={2} sx={{ mt: 2 }}>
          <Grid>
            <Typography className="flex items-center h-full">Name</Typography>
          </Grid>
          <Grid>
            <TextField defaultValue={"Hi"}></TextField>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
