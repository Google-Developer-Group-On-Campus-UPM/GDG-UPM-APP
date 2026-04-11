import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Grid,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Event } from "@/constants/types/events.type";
import { Department, Role, TeamMember } from "@/constants/types/team.type";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

type EditUserModalProps = {
  open: boolean;
  user: TeamMember | null;
  onClose: () => void;
  onSave?: (updated: TeamMember) => void;
};

type EditDepartmentModalProps = {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onSave?: (updated: { name: string; description: string }) => void;
};

type EditRoleModalProps = {
  open: boolean;
  roleItem: Role | null;
  onClose: () => void;
  onSave?: (updated: { title: string }) => void;
};

type EditEventModalProps = {
  open: boolean;
  eventItem: Event | null;
  onClose: () => void;
  onSave?: (
    updated: {
      title: string;
      description: string;
      status: "upcoming" | "past";
    },
  ) => void;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export function EditUserModal({
  open,
  user,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [form, setForm] = useState<TeamMember | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    if (!form) {
      setErrors({ form: "Form data is required" });
      return false;
    }

    const newErrors: Record<string, string> = {};
    if (!form.name?.trim()) newErrors.name = "Name is required";
    if (!form.role?.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (user) {
      setForm({ ...user });
      setErrors({});
    }
  }, [user]);

  if (!form) return null;

  const handleChange =
    <K extends keyof TeamMember>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => (prev ? { ...prev, [key]: e.target.value } : prev));
    };

  const handleSave = () => {
    if (!form || !validateForm()) return;
    onSave?.(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Typography variant="h6" mb={3}>
            {user?.ref ? "Edit User" : "Add User"}
          </Typography>

          {/* Form */}
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={form.name ?? ""}
                  onChange={handleChange("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Role"
                  fullWidth
                  value={form.role ?? ""}
                  onChange={handleChange("role")}
                  error={Boolean(errors.role)}
                  helperText={errors.role}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Image URL"
                  fullWidth
                  value={form.image ?? ""}
                  onChange={handleChange("image")}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="Interest"
                  fullWidth
                  value={form.interest ?? ""}
                  onChange={handleChange("interest")}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  label="LinkedIn"
                  fullWidth
                  value={form.social?.linkedin ?? ""}
                  onChange={(e) =>
                    setForm((prev) =>
                      prev
                        ? {
                            ...prev,
                            social: {
                              ...prev.social,
                              linkedin: e.target.value,
                            },
                          }
                        : prev,
                    )
                  }
                />
              </Grid>

              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm((prev) =>
                          prev ? { ...prev, isActive: e.target.checked } : prev,
                        )
                      }
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>

            {/* Actions */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </Modal>
  );
}

export function EditDepartmentModal({
  open,
  department,
  onClose,
  onSave,
}: EditDepartmentModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setName(department?.name ?? "");
    setDescription(department?.description ?? "");
    setErrors({});
  }, [department, open]);

  const handleSave = () => {
    if (!name.trim()) {
      setErrors({ name: "Department name is required" });
      return;
    }

    onSave?.({ name: name.trim(), description: description.trim() });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={3}>
            {department?.ref ? "Edit Department" : "Add Department"}
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Department Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </Modal>
  );
}

export function EditRoleModal({
  open,
  roleItem,
  onClose,
  onSave,
}: EditRoleModalProps) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTitle(roleItem?.title ?? "");
    setErrors({});
  }, [roleItem, open]);

  const handleSave = () => {
    if (!title.trim()) {
      setErrors({ title: "Role title is required" });
      return;
    }

    onSave?.({ title: title.trim() });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={3}>
            {roleItem?.ref ? "Edit Role" : "Add Role"}
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Role Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </Modal>
  );
}

export function EditEventModal({
  open,
  eventItem,
  onClose,
  onSave,
}: EditEventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"upcoming" | "past">("upcoming");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTitle(eventItem?.title ?? "");
    setDescription(eventItem?.description ?? "");
    setStatus(eventItem?.status ?? "upcoming");
    setErrors({});
  }, [eventItem, open]);

  const handleSave = () => {
    if (!title.trim()) {
      setErrors({ title: "Event title is required" });
      return;
    }

    onSave?.({ title: title.trim(), description: description.trim(), status });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={3}>
            {eventItem?.ref ? "Edit Event" : "Add Event"}
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Event Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "upcoming" | "past")}
              fullWidth
            >
              <MenuItem value="upcoming">upcoming</MenuItem>
              <MenuItem value="past">past</MenuItem>
            </TextField>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Box>
      </ThemeProvider>
    </Modal>
  );
}
