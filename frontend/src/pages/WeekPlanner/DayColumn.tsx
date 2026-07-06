import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import type { DayOfWeek, Task, Week } from "../../types";
import { DAY_LABELS } from "../../types";
import { TaskCard } from "./TaskCard";
import { TaskFormDialog } from "../TaskFormDialog";
import {
  useCompleteTask,
  useCreateTask,
  useDeleteTask,
  useDuplicateTask,
  useUncompleteTask,
  useUpdateTask,
} from "../../hooks/useTasks";

interface Props {
  day: DayOfWeek;
  week: Week;
}

export function DayColumn({ day, week }: Props) {
  const tasks = week.tasks.filter((t) => t.day_of_week === day);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const createTask = useCreateTask(week.id);
  const updateTask = useUpdateTask(week.id);
  const completeTask = useCompleteTask(week.id);
  const uncompleteTask = useUncompleteTask(week.id);
  const duplicateTask = useDuplicateTask(week.id);
  const deleteTask = useDeleteTask(week.id);

  const completedCount = tasks.filter((t) => t.is_completed).length;

  return (
    <Box
      sx={{
        flex: "1 1 0",
        minWidth: 240,
        bgcolor: "background.default",
        borderRadius: 2,
        p: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
        {DAY_LABELS[day]}
      </Typography>

      <Typography variant="caption" color="text.secondary" display="block" mb={1}>
        {completedCount}/{tasks.length} concluída{tasks.length !== 1 ? "s" : ""}
      </Typography>

      <Divider sx={{ mb: 1 }} />

      <Stack spacing={1}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={(notes) =>
              completeTask.mutate({ taskId: task.id, notes: notes || undefined })
            }
            onUncomplete={() => uncompleteTask.mutate(task.id)}
            onEdit={() => setEditTask(task)}
            onDuplicate={() => duplicateTask.mutate(task.id)}
            onDelete={() => deleteTask.mutate(task.id)}
            onUpdateNotes={(notes) =>
              updateTask.mutate({ taskId: task.id, data: { learning_notes: notes } })
            }
          />
        ))}
      </Stack>

      <Button
        startIcon={<AddIcon />}
        size="small"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => setCreateOpen(true)}
      >
        Adicionar
      </Button>

      <TaskFormDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        defaultDay={day}
        onSubmit={(v) => createTask.mutate(v)}
      />

      {editTask && (
        <TaskFormDialog
          open={!!editTask}
          onClose={() => setEditTask(null)}
          task={editTask}
          onSubmit={(v) =>
            updateTask.mutate({ taskId: editTask.id, data: v })
          }
        />
      )}
    </Box>
  );
}