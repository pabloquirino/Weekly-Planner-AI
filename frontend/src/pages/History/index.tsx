import {
  Box, Button, ButtonGroup, Grid,
  Stack, TextField, Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "../../hooks/useHistory";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { WeekCard } from "./WeekCard";
import { WeekDetailDialog } from "./WeekDetailDialog";
import type { WeekHistoryItem } from "../../types";

const PRESETS = [
  { label: "Todas", value: "" },
  { label: "Últimas 4 semanas", value: "last_4" },
  { label: "Último mês", value: "last_month" },
  { label: "Últimos 3 meses", value: "last_3_months" },
];

export function HistoryPage() {
  const [preset, setPreset] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<WeekHistoryItem | null>(null);

  const filters = preset
    ? { preset }
    : {
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      };

  const { data, isLoading } = useHistory(filters);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Histórico
      </Typography>

      {/* Filtros */}
      <Stack spacing={2} mb={3}>
        <ButtonGroup size="small">
          {PRESETS.map((p) => (
            <Button
              key={p.value}
              variant={preset === p.value ? "contained" : "outlined"}
              onClick={() => {
                setPreset(p.value);
                setStartDate("");
                setEndDate("");
              }}
            >
              {p.label}
            </Button>
          ))}
        </ButtonGroup>

        {/* Período personalizado */}
        {preset === "" && (
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="De"
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 180 }}
            />
            <TextField
              label="Até"
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 180 }}
            />
          </Stack>
        )}
      </Stack>

      {/* Resultado */}
      {isLoading ? (
        <LoadingSpinner />
      ) : !data?.weeks.length ? (
        <Box textAlign="center" mt={8}>
          <Typography color="text.secondary">
            Nenhuma semana encontrada para o período selecionado.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {data.total} semana{data.total !== 1 ? "s" : ""} encontrada{data.total !== 1 ? "s" : ""}
          </Typography>
          <Grid container spacing={2}>
            {data.weeks.map((week) => (
              <Grid item xs={12} md={6} lg={4} key={week.id}>
                <WeekCard week={week} onClick={() => setSelectedWeek(week)} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <WeekDetailDialog
        week={selectedWeek}
        onClose={() => setSelectedWeek(null)}
      />
    </Box>
  );
}