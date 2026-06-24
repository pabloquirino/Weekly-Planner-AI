import {
  Card, CardContent, Checkbox, Chip, IconButton,
  Stack, Tooltip, Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Task } from "../../types";

interface Props {
  task: Task;
  onComplete: () => void;
  onUncomplete: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onComplete, onUncomplete, onEdit, onDuplicate, onDelete }: Props) {
  return (
    <Card variant="outlined" sx={{ opacity: task.is_completed ? 0.7 : 1 }}>
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack direction="row" alignItems="flex-start" spacing={1}>
          <Checkbox
            checked={task.is_completed}
            onChange={() => task.is_completed ? onUncomplete() : onComplete()}
            size="small"
            sx={{ mt: -0.5 }}
          />
          <Stack flexGrow={1} spacing={0.5}>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ textDecoration: task.is_completed ? "line-through" : "none" }}
            >
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="caption" color="text.secondary">
                {task.description}
              </Typography>
            )}
            {task.learning_notes && (
              <Chip label="📝 Aprendizado registrado" size="small" color="success" variant="outlined" />
            )}
          </Stack>
          <Stack direction="row">
            <Tooltip title="Editar">
              <IconButton size="small" onClick={onEdit}><EditIcon fontSize="inherit" /></IconButton>
            </Tooltip>
            <Tooltip title="Duplicar">
              <IconButton size="small" onClick={onDuplicate}><ContentCopyIcon fontSize="inherit" /></IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
              <IconButton size="small" color="error" onClick={onDelete}><DeleteIcon fontSize="inherit" /></IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}