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
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { TeamMember } from "@/constants/types/team.type";

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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 520,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
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
