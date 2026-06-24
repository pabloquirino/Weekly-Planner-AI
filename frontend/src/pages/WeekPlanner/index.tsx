import {
  Box, Button, MenuItem, Select, Stack,
  Tooltip, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { DAYS } from "../../types";
import { useCreateWeek, useDuplicateWeek, useWeek, useWeeks } from "../../hooks/useWeeks";
import { useWeekStore } from "../../store/weekStore";
import { DayColumn } from "./DayColumn";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  return `${fmt(start)} — ${fmt(end)}`;
}

function getThisMonday() {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  return monday.toISOString().split("T")[0];
}

export function WeekPlannerPage() {
  const { data: weeks = [], isLoading: loadingWeeks } = useWeeks();
  const { selectedWeekId, setSelectedWeekId } = useWeekStore();
  const { data: week, isLoading: loadingWeek } = useWeek(selectedWeekId ?? 0);
  const createWeek = useCreateWeek();
  const duplicateWeek = useDuplicateWeek();
  const [creating, setCreating] = useState(false);

  const activeId = selectedWeekId ?? weeks[0]?.id;

  const handleCreate = async () => {
    setCreating(true);
    const w = await createWeek.mutateAsync(getThisMonday());
    setSelectedWeekId(w.id);
    setCreating(false);
  };

  if (loadingWeeks) return <LoadingSpinner />;

  if (weeks.length === 0) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography variant="h6" mb={2}>Nenhuma semana criada ainda.</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate} disabled={creating}>
          Criar semana atual
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} mb={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight={700}>Planejamento Semanal</Typography>

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

        <Tooltip title="Criar nova semana">
          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleCreate} disabled={creating}>
            Nova semana
          </Button>
        </Tooltip>

        {activeId && (
          <Tooltip title="Duplicar semana atual para a próxima">
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() => duplicateWeek.mutate(activeId)}
            >
              Duplicar semana
            </Button>
          </Tooltip>
        )}
      </Stack>

      {loadingWeek || !week ? (
        <LoadingSpinner />
      ) : (
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", pb: 2 }}>
          {DAYS.map((day) => (
            <DayColumn key={day} day={day} week={week} />
          ))}
        </Stack>
      )}
    </Box>
  );
}