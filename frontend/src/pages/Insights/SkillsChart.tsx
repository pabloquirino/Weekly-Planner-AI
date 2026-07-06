import { Box, LinearProgress, Stack, Typography } from "@mui/material";

interface Props {
  data: Record<string, number>;
}

const COLORS = ["#1976d2", "#2e7d32", "#7b1fa2", "#ed6c02", "#0288d1", "#c62828"];

export function SkillsChart({ data }: Props) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <Stack spacing={1.5}>
      {entries.map(([skill, pct], i) => (
        <Box key={skill}>
          <Stack direction="row" justifyContent="space-between" mb={0.5}>
            <Typography variant="body2">{skill}</Typography>
            <Typography variant="body2" fontWeight={600}>
              {pct}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: `${COLORS[i % COLORS.length]}22`,
              "& .MuiLinearProgress-bar": {
                bgcolor: COLORS[i % COLORS.length],
                borderRadius: 4,
              },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}