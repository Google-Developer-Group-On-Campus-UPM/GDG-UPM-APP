import { DataWithId } from "@/constants/types/base.type";
import { Event } from "@/constants/types/events.type";
import { Department, Role } from "@/constants/types/team.type";
import BaseService from "@/services/firebase/baseService";
import EventService from "@/services/events/eventService";
import TeamService from "@/services/team/teamService";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import toast from "react-hot-toast";

type BasicModalProps = {
  open: boolean;
  onClose: () => void;
  type: "events" | "roles" | "departments";
  department?: Department | null;
  roleItem?: Role | null;
  eventItem?: Event | null;
  isAdding?: boolean;
  onSave?: () => void;
};

const service = new BaseService();
const teamService = new TeamService();
const eventService = new EventService();

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

export function BasicModal({
  open,
  onClose,
  type,
  department,
  roleItem,
  eventItem,
  isAdding,
  onSave,
}: BasicModalProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<"upcoming" | "past">("upcoming");

  React.useEffect(() => {
    if (type === "departments") {
      setName(department?.name || "");
      setDescription(department?.description || "");
      return;
    }

    if (type === "roles") {
      setName(roleItem?.title || "");
      setDescription("");
      return;
    }

    if (type === "events") {
      setName(eventItem?.title || "");
      setDescription(eventItem?.description || "");
      setStatus(eventItem?.status || "upcoming");
    }
  }, [type, department, roleItem, eventItem]);

  const handleSave = async () => {
    try {
      if (type === "departments") {
        if (!name.trim()) {
          toast.error("Department name is required.");
          return;
        }

        if (isAdding) {
          await teamService.createDepartment({ name: name.trim(), description: description.trim() });
        } else if (department?.ref) {
          await teamService.updateDepartment(
            { name: name.trim(), description: description.trim() },
            department.ref,
          );
        }
      }

      if (type === "roles") {
        if (!name.trim()) {
          toast.error("Role title is required.");
          return;
        }

        if (isAdding) {
          await teamService.createRole({ title: name.trim() });
        } else if (roleItem?.ref) {
          await teamService.updateRole({ title: name.trim() }, roleItem.ref);
        }
      }

      if (type === "events") {
        if (!name.trim()) {
          toast.error("Event title is required.");
          return;
        }

        if (isAdding) {
          await eventService.createEvent({
            title: name.trim(),
            description: description.trim(),
            status,
            mode: "physical",
            location: "TBA",
            dateStart: new Date(),
            ticketType: "Free",
            maxParticipants: 100,
            image: "/images/test.png",
            isActive: true,
          });
        } else if (eventItem?.ref) {
          await eventService.updateEvent(
            {
              title: name.trim(),
              description: description.trim(),
              status,
            },
            eventItem.ref,
          );
        }
      }

      toast.success("Saved successfully.");
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
            <Typography className="flex items-center h-full">
              {type === "roles" ? "Title" : "Name"}
            </Typography>
          </Grid>
          <Grid>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>

          {(type === "departments" || type === "events") && (
            <>
              <Grid>
                <Typography className="flex items-center h-full">Description</Typography>
              </Grid>
              <Grid>
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                />
              </Grid>
            </>
          )}

          {type === "events" && (
            <>
              <Grid>
                <Typography className="flex items-center h-full">Status</Typography>
              </Grid>
              <Grid>
                <TextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "upcoming" | "past")}
                  fullWidth
                >
                  <MenuItem value="upcoming">upcoming</MenuItem>
                  <MenuItem value="past">past</MenuItem>
                </TextField>
              </Grid>
            </>
          )}
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}
