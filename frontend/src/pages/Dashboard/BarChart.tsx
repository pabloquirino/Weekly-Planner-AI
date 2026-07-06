import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DayStats } from "../../types";

interface Props {
  data: DayStats[];
}

export function ProductivityBarChart({ data }: Props) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Produtividade por dia
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" name="Total" fill="#1976d2" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" name="Concluídas" fill="#2e7d32" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}