import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useWeeks } from "../../hooks/useWeeks";
import { useWeekStore } from "../../store/weekStore";
import { useAnalysis, useGenerateAnalysis } from "../../hooks/useAnalysis";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { InsightSection } from "./InsightSection";
import { StrengthsList } from "./StrengthsList";
import { SkillsChart } from "./SkillsChart";

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  return `${fmt(start)} — ${fmt(end)}`;
}

export function InsightsPage() {
  const { data: weeks = [], isLoading: loadingWeeks } = useWeeks();
  const { selectedWeekId, setSelectedWeekId } = useWeekStore();
  const activeId = selectedWeekId ?? weeks[0]?.id;

  const { data: analysis, isLoading: loadingAnalysis } = useAnalysis(activeId);
  const generate = useGenerateAnalysis(activeId);

  if (loadingWeeks) return <LoadingSpinner />;

  if (!weeks.length) {
    return (
      <Box mt={8} textAlign="center">
        <Typography variant="h6">Nenhuma semana encontrada.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3} flexWrap="wrap">
        <Typography variant="h5" fontWeight={700}>
          Weekly Insights
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
        <Button
          variant="contained"
          startIcon={
            generate.isPending ? (
              <CircularProgress size={16} color="inherit" />
            ) : analysis ? (
              <RefreshIcon />
            ) : (
              <AutoAwesomeIcon />
            )
          }
          onClick={() => generate.mutate()}
          disabled={generate.isPending}
        >
          {generate.isPending
            ? "Gerando análise..."
            : analysis
            ? "Regenerar análise"
            : "Gerar análise da semana"}
        </Button>
      </Stack>

      {generate.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao gerar análise. Verifique sua chave da OpenAI e tente novamente.
        </Alert>
      )}

      {/* Estado vazio */}
      {!loadingAnalysis && !analysis && !generate.isPending && (
        <Paper
          variant="outlined"
          sx={{ p: 6, textAlign: "center", borderStyle: "dashed" }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Nenhuma análise gerada ainda
          </Typography>
          <Typography variant="body2" color="text.disabled" mt={1}>
            Clique em "Gerar análise da semana" para obter insights com IA.
          </Typography>
        </Paper>
      )}

      {/* Loading */}
      {(loadingAnalysis || generate.isPending) && <LoadingSpinner />}

      {/* Análise */}
      {analysis && !generate.isPending && (
        <Stack spacing={2.5}>
          {/* Resumo geral */}
          <Paper variant="outlined" sx={{ p: 2.5, bgcolor: "action.hover" }}>
            <Typography variant="body1">{analysis.summary}</Typography>
            <Typography variant="caption" color="text.secondary" mt={1} display="block">
              Gerada em{" "}
              {new Date(analysis.generated_at).toLocaleString("pt-BR")}
            </Typography>
          </Paper>

          <Grid container spacing={2}>
            {/* Pontos fortes */}
            <Grid item xs={12} md={6}>
              <InsightSection title="Pontos Fortes" icon="💪" color="#2e7d32">
                <StrengthsList items={analysis.strengths} color="#2e7d32" />
              </InsightSection>
            </Grid>

            {/* Pontos de atenção */}
            <Grid item xs={12} md={6}>
              <InsightSection title="Pontos de Atenção" icon="⚠️" color="#ed6c02">
                <StrengthsList items={analysis.weaknesses} color="#ed6c02" />
              </InsightSection>
            </Grid>

            {/* Sugestões */}
            <Grid item xs={12} md={6}>
              <InsightSection title="Sugestões de Melhoria" icon="💡" color="#1976d2">
                <StrengthsList items={analysis.suggestions} color="#1976d2" />
              </InsightSection>
            </Grid>

            {/* Próximos passos */}
            <Grid item xs={12} md={6}>
              <InsightSection title="Próximos Passos" icon="🎯" color="#7b1fa2">
                <StrengthsList items={analysis.next_steps} color="#7b1fa2" />
              </InsightSection>
            </Grid>

            {/* Skills breakdown */}
            <Grid item xs={12}>
              <InsightSection title="Áreas Desenvolvidas" icon="📊" color="#0288d1">
                <SkillsChart data={analysis.skills_breakdown} />
              </InsightSection>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Box>
  );
}