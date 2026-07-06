import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";
import type { Task } from "../../types";
import { LearningDialog } from "../LearningDialog";

interface Props {
  task: Task;
  onComplete: (notes: string) => void;
  onUncomplete: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdateNotes: (notes: string) => void;
}

export function TaskCard({
  task,
  onComplete,
  onUncomplete,
  onEdit,
  onDuplicate,
  onDelete,
  onUpdateNotes,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [learningMode, setLearningMode] = useState<"complete" | "edit">("complete");

  const handleCheckbox = () => {
    if (task.is_completed) {
      onUncomplete();
    } else {
      setLearningMode("complete");
      setLearningOpen(true);
    }
  };

  const handleChipClick = () => {
    setLearningMode("edit");
    setLearningOpen(true);
  };

  const handleLearningConfirm = (notes: string) => {
    if (learningMode === "complete") {
      onComplete(notes);
    } else {
      onUpdateNotes(notes);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          opacity: task.is_completed ? 0.75 : 1,
          position: "relative",
          transition: "box-shadow 0.15s",
          "&:hover": { boxShadow: 2 },
        }}
      >
        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
          <Stack direction="row" alignItems="flex-start" spacing={1.5}>
            <Checkbox
              checked={task.is_completed}
              onChange={handleCheckbox}
              size="small"
              sx={{ mt: -0.5 }}
            />

            <Stack flexGrow={1} spacing={0.75}>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{
                  textDecoration: task.is_completed ? "line-through" : "none",
                  pr: hovered ? 7 : 0, // reserva espaço para os ícones não sobrepor o texto
                  transition: "padding 0.1s",
                }}
              >
                {task.title}
              </Typography>

              {task.description && (
                <Typography variant="caption" color="text.secondary">
                  {task.description}
                </Typography>
              )}

              {task.is_completed && (
                <Chip
                  icon={<SchoolIcon />}
                  label={task.learning_notes ? "Ver aprendizado" : "Registrar aprendizado"}
                  size="small"
                  color={task.learning_notes ? "success" : "default"}
                  variant="outlined"
                  onClick={handleChipClick}
                  sx={{ alignSelf: "flex-start", cursor: "pointer" }}
                />
              )}
            </Stack>
          </Stack>
        </CardContent>

        {/* Ações aparecem só no hover, posicionadas no canto superior direito */}
        {hovered && (
          <Stack
            direction="row"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 1,
              px: 0.5,
            }}
          >
            <Tooltip title="Editar">
              <IconButton size="small" onClick={onEdit}>
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Duplicar">
              <IconButton size="small" onClick={onDuplicate}>
                <ContentCopyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
              <IconButton size="small" color="error" onClick={onDelete}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Card>

      <LearningDialog
        open={learningOpen}
        task={task}
        mode={learningMode}
        onClose={() => setLearningOpen(false)}
        onConfirm={handleLearningConfirm}
      />
    </>
  );
}