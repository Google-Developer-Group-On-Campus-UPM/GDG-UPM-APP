import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Event } from "@/constants/types/events.type";
import { Department, Role, TeamMember } from "@/constants/types/team.type";

type EditUserModalProps = {
  open: boolean;
  user: TeamMember | null;
  roles: Role[];
  departments: Department[];
  onClose: () => void;
  onSave?: (updated: TeamMember) => void;
};

type EditDepartmentModalProps = {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onSave?: (updated: { id: string; name: string; description: string }) => void;
};

type EditRoleModalProps = {
  open: boolean;
  roleItem: Role | null;
  onClose: () => void;
  onSave?: (updated: { id: string; title: string }) => void;
};

type EditEventModalProps = {
  open: boolean;
  eventItem: Event | null;
  onClose: () => void;
  onSave?: (updated: {
    title: string;
    description: string;
    mode: Event["mode"];
    location: string;
    dateStart: Date;
    dateEnd?: Date;
    maxParticipants: number;
    image: string;
    status: "upcoming" | "past";
    tags?: Event["tags"];
    registrationLink?: string;
    isActive: boolean;
  }) => void;
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

function useModalTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#026cba",
          },
        },
      }),
    [isDarkMode],
  );
}

export function EditUserModal({
  open,
  user,
  roles,
  departments,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [form, setForm] = useState<TeamMember | null>(null);
  const theme = useModalTheme();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    if (!form) {
      setErrors({ form: "Form data is required" });
      return false;
    }

    const newErrors: Record<string, string> = {};
    if (!form.name?.trim()) newErrors.name = "Name is required";
    if (!form.role?.trim()) newErrors.role = "Role is required";
    if (!form.currentRoleID?.trim())
      newErrors.currentRoleID = "Current role is required";
    if (!form.currentDepartmentID?.trim())
      newErrors.currentDepartmentID = "Current department is required";
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
      <ThemeProvider theme={theme}>
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
                  select
                  label="Current Role"
                  fullWidth
                  value={form.currentRoleID ?? ""}
                  onChange={handleChange("currentRoleID")}
                  error={Boolean(errors.currentRoleID)}
                  helperText={errors.currentRoleID}
                >
                  {roles.map((roleItem) => (
                    <MenuItem key={roleItem.id} value={roleItem.id ?? ""}>
                      {roleItem.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  select
                  label="Current Department"
                  fullWidth
                  value={form.currentDepartmentID ?? ""}
                  onChange={handleChange("currentDepartmentID")}
                  error={Boolean(errors.currentDepartmentID)}
                  helperText={errors.currentDepartmentID}
                >
                  {departments.map((departmentItem) => (
                    <MenuItem
                      key={departmentItem.id}
                      value={departmentItem.id ?? ""}
                    >
                      {departmentItem.name}
                    </MenuItem>
                  ))}
                </TextField>
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
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ borderColor: "#026cba", color: "#026cba" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{ bgcolor: "#026cba", "&:hover": { bgcolor: "#015b9b" } }}
              >
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
  const theme = useModalTheme();
  const [departmentId, setDepartmentId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setDepartmentId(department?.id ?? "");
    setName(department?.name ?? "");
    setDescription(department?.description ?? "");
    setErrors({});
  }, [department]);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!departmentId) {
      newErrors.id = "Department id is required";
    }

    if (!name.trim()) {
      newErrors.name = "Department name is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave?.({
      id: departmentId,
      name: name.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={theme}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={3}>
            {department?.ref ? "Edit Department" : "Add Department"}
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Department ID"
              fullWidth
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              error={Boolean(errors.id)}
              helperText={errors.id}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

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
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ borderColor: "#026cba", color: "#026cba" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{ bgcolor: "#026cba", "&:hover": { bgcolor: "#015b9b" } }}
              >
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
  const theme = useModalTheme();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setId(roleItem?.id ?? "");
    setTitle(roleItem?.title ?? "");
    setErrors({});
  }, [roleItem]);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!id.trim()) {
      newErrors.id = "Role id is required";
    }

    if (!title.trim()) {
      newErrors.title = "Role title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave?.({ id: id.trim(), title: title.trim() });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={theme}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={3}>
            {roleItem?.ref ? "Edit Role" : "Add Role"}
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Role ID"
              fullWidth
              value={id}
              onChange={(e) => setId(e.target.value)}
              error={Boolean(errors.id)}
              helperText={errors.id}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="Role Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{ borderColor: "#026cba", color: "#026cba" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{ bgcolor: "#026cba", "&:hover": { bgcolor: "#015b9b" } }}
              >
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
  const theme = useModalTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [mode, setMode] = useState<Event["mode"]>("physical");
  const [location, setLocation] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"upcoming" | "past">("upcoming");
  const [registrationLink, setRegistrationLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toLocalDateTimeInput = useCallback((value?: unknown) => {
    if (!value) return "";

    let date: Date | null = null;

    if (value instanceof Date) {
      date = value;
    } else if (
      typeof value === "object" &&
      value !== null &&
      "toDate" in value &&
      typeof (value as { toDate: () => Date }).toDate === "function"
    ) {
      date = (value as { toDate: () => Date }).toDate();
    } else if (
      typeof value === "object" &&
      value !== null &&
      "seconds" in value &&
      typeof (value as { seconds?: number }).seconds === "number"
    ) {
      const timestamp = value as { seconds: number; nanoseconds?: number };
      date = new Date(
        timestamp.seconds * 1000 + (timestamp.nanoseconds ?? 0) / 1_000_000,
      );
    } else if (typeof value === "string" || typeof value === "number") {
      const parsedDate = new Date(value);
      date = Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    if (!date || Number.isNaN(date.getTime())) return "";

    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }, []);

  const tagsToInputValue = useCallback((value?: Event["tags"]) => {
    return value?.map((item) => item.tag).join(", ") ?? "";
  }, []);

  const parseTags = useCallback((value: string) => {
    const uniqueTags = new Set<string>();

    for (const tag of value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)) {
      uniqueTags.add(tag);
    }

    return Array.from(uniqueTags).map((tag) => ({ tag }));
  }, []);

  useEffect(() => {
    setTitle(eventItem?.title ?? "");
    setDescription(eventItem?.description ?? "");
    setTags(tagsToInputValue(eventItem?.tags));
    setMode(eventItem?.mode ?? "physical");
    setLocation(eventItem?.location ?? "");
    setDateStart(toLocalDateTimeInput(eventItem?.dateStart));
    setDateEnd(toLocalDateTimeInput(eventItem?.dateEnd));
    setMaxParticipants(eventItem?.maxParticipants ?? 100);
    setImage(eventItem?.image ?? "/images/test.png");
    setStatus(eventItem?.status ?? "upcoming");
    setRegistrationLink(eventItem?.registrationLink ?? "");
    setIsActive(eventItem?.isActive ?? true);
    setErrors({});
  }, [eventItem, tagsToInputValue, toLocalDateTimeInput]);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Event title is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!dateStart) newErrors.dateStart = "Start date and time are required";
    if (!image.trim()) newErrors.image = "Image path is required";
    if (!Number.isFinite(maxParticipants) || maxParticipants < 1) {
      newErrors.maxParticipants = "Max participants must be at least 1";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave?.({
      title: title.trim(),
      description: description.trim(),
      mode,
      location: location.trim(),
      dateStart: new Date(dateStart),
      dateEnd: dateEnd ? new Date(dateEnd) : undefined,
      maxParticipants,
      image: image.trim(),
      status,
      tags: parseTags(tags),
      registrationLink: registrationLink.trim() || undefined,
      isActive,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            ...modalStyle,
            width: { xs: "92vw", sm: 520 },
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" mb={3}>
            {eventItem?.ref ? "Edit Event" : "Add Event"}
          </Typography>

          <Stack spacing={3} sx={{ overflowY: "auto", pr: 1, flex: 1 }}>
            <TextField
              label="Event Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={Boolean(errors.title)}
              helperText={errors.title}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              select
              label="Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as Event["mode"])}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            >
              <MenuItem value="online">online</MenuItem>
              <MenuItem value="physical">physical</MenuItem>
              <MenuItem value="hybrid">hybrid</MenuItem>
            </TextField>

            <TextField
              label="Location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              error={Boolean(errors.location)}
              helperText={errors.location}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              error={Boolean(errors.dateStart)}
              helperText={errors.dateStart}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="End Date & Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="Max Participants"
              type="number"
              fullWidth
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              error={Boolean(errors.maxParticipants)}
              helperText={errors.maxParticipants}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="Image URL/Path"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
              error={Boolean(errors.image)}
              helperText={errors.image}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              label="Tags"
              fullWidth
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              helperText="Separate tags with commas, for example: AI, Workshop, Networking"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "upcoming" | "past")}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            >
              <MenuItem value="upcoming">upcoming</MenuItem>
              <MenuItem value="past">past</MenuItem>
            </TextField>

            <TextField
              label="Registration Link"
              fullWidth
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#026cba" },
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Active"
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{
              pt: 2,
              mt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ borderColor: "#026cba", color: "#026cba" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ bgcolor: "#026cba", "&:hover": { bgcolor: "#015b9b" } }}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </ThemeProvider>
    </Modal>
  );
}
