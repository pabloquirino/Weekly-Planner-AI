import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useWeekStore } from "../../store/weekStore";
import { useWeeks } from "../../hooks/useWeeks";
import { useDashboard } from "../../hooks/useDashboard";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { MetricCard } from "./MetricCard";
import { TaskPieChart } from "./PieChart";
import { ProductivityBarChart } from "./BarChart";
import { HistoryLineChart } from "./LineChart";

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  return `${fmt(start)} — ${fmt(end)}`;
}

export function DashboardPage() {
  const { data: weeks = [], isLoading: loadingWeeks } = useWeeks();
  const { selectedWeekId, setSelectedWeekId } = useWeekStore();
  const activeId = selectedWeekId ?? weeks[0]?.id;
  const { data, isLoading } = useDashboard(activeId);

  if (loadingWeeks || isLoading) return <LoadingSpinner />;

  if (!weeks.length) {
    return (
      <Box mt={8} textAlign="center">
        <Typography variant="h6">Nenhuma semana encontrada.</Typography>
        <Typography variant="body2" color="text.secondary">
          Crie uma semana no Planner primeiro.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
        <Select
          size="small"
          value={activeId ?? ""}
          onChange={(e) => setSelectedWeekId(Number(e.target.value))}
          sx={{ minWidth: 220 }}
        >
          {weeks.map((w) => (
            <MenuItem key={w.id} value={w.id}>
              {formatDateRange(w.start_date, w.end_date)}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {/* Cards de métricas */}
      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        <MetricCard
          label="Total de tarefas"
          value={data?.total_tasks ?? 0}
          icon={<AssignmentIcon />}
          color="#1976d2"
        />
        <MetricCard
          label="Concluídas"
          value={data?.completed_tasks ?? 0}
          icon={<CheckCircleIcon />}
          color="#2e7d32"
        />
        <MetricCard
          label="Pendentes"
          value={data?.pending_tasks ?? 0}
          icon={<PendingIcon />}
          color="#ed6c02"
        />
        <MetricCard
          label="Taxa de conclusão"
          value={`${data?.completion_rate ?? 0}%`}
          icon={<TrendingUpIcon />}
          color="#7b1fa2"
        />
      </Stack>

      {/* Gráficos */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent>
              <TaskPieChart
                completed={data?.completed_tasks ?? 0}
                pending={data?.pending_tasks ?? 0}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card variant="outlined">
            <CardContent>
              <ProductivityBarChart data={data?.by_day ?? []} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <HistoryLineChart data={data?.history ?? []} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}