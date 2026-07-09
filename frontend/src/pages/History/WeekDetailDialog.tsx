import {
  Box, Chip, Dialog, DialogContent, DialogTitle,
  Divider, IconButton, Stack, Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SchoolIcon from "@mui/icons-material/School";
import type { WeekHistoryItem } from "../../types";

interface Props {
  week: WeekHistoryItem | null;
  onClose: () => void;
}

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export function WeekDetailDialog({ week, onClose }: Props) {
  if (!week) return null;

  const days = [...new Set(week.tasks.map((t) => t.day_of_week))];

  return (
    <Dialog open={!!week} onClose={onClose} fullWidth maxWidth="md" scroll="paper">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {formatDate(week.start_date)} — {formatDate(week.end_date)}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Análise IA se existir */}
          {week.analysis && (
            <Box
              sx={{
                p: 2, borderRadius: 2,
                bgcolor: "action.hover",
                borderLeft: "4px solid",
                borderColor: "secondary.main",
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                ✨ Resumo da análise IA
              </Typography>
              <Typography variant="body2">{week.analysis.summary}</Typography>
            </Box>
          )}

          {/* Tarefas por dia */}
          {week.tasks.length === 0 ? (
            <Typography color="text.secondary">Nenhuma tarefa nesta semana.</Typography>
          ) : (
            days.map((day) => {
              const dayTasks = week.tasks.filter((t) => t.day_of_week === day);
              return (
                <Box key={day}>
                  <Typography variant="subtitle2" fontWeight={700} mb={1}>
                    {day}
                  </Typography>
                  <Stack spacing={1}>
                    {dayTasks.map((task) => (
                      <Box
                        key={task.id}
                        sx={{
                          p: 1.5, borderRadius: 1,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                          {task.is_completed ? (
                            <CheckCircleIcon color="success" fontSize="small" sx={{ mt: 0.2 }} />
                          ) : (
                            <RadioButtonUncheckedIcon color="disabled" fontSize="small" sx={{ mt: 0.2 }} />
                          )}
                          <Stack spacing={0.5} flexGrow={1}>
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
                              <Box
                                sx={{
                                  mt: 0.5, p: 1, borderRadius: 1,
                                  bgcolor: "success.main",
                                  opacity: 0.85,
                                }}
                              >
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                  <SchoolIcon sx={{ fontSize: 14, color: "white" }} />
                                  <Typography variant="caption" sx={{ color: "white" }}>
                                    {task.learning_notes}
                                  </Typography>
                                </Stack>
                              </Box>
                            )}
                          </Stack>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              );
            })
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}