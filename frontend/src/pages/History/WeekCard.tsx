import {
  Box, Card, CardActionArea, CardContent,
  Chip, LinearProgress, Stack, Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import type { WeekHistoryItem } from "../../types";

interface Props {
  week: WeekHistoryItem;
  onClick: () => void;
}

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit", month: "short", year: "numeric",
    });
  return `${fmt(start)} — ${fmt(end)}`;
}

function rateColor(rate: number) {
  if (rate >= 80) return "success";
  if (rate >= 50) return "warning";
  return "error";
}

export function WeekCard({ week, onClick }: Props) {
  return (
    <Card variant="outlined" sx={{ "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.2s" }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
            <Typography variant="subtitle1" fontWeight={700}>
              {formatDateRange(week.start_date, week.end_date)}
            </Typography>
            <Stack direction="row" spacing={1}>
              {week.analysis && (
                <Chip
                  icon={<AutoAwesomeIcon />}
                  label="Análise IA"
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              )}
              <Chip
                label={`${week.completion_rate}%`}
                size="small"
                color={rateColor(week.completion_rate)}
              />
            </Stack>
          </Stack>

          <Stack direction="row" spacing={3} mb={1.5}>
            <Box>
              <Typography variant="caption" color="text.secondary">Total</Typography>
              <Typography variant="h6" fontWeight={700}>{week.total_tasks}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Concluídas</Typography>
              <Typography variant="h6" fontWeight={700} color="success.main">
                {week.completed_tasks}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Pendentes</Typography>
              <Typography variant="h6" fontWeight={700} color="warning.main">
                {week.total_tasks - week.completed_tasks}
              </Typography>
            </Box>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={week.completion_rate}
            color={rateColor(week.completion_rate)}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}