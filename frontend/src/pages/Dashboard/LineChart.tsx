import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WeekHistory } from "../../types";

interface Props {
  data: WeekHistory[];
}

export function HistoryLineChart({ data }: Props) {
  const formatted = data.map((w) => ({
    ...w,
    label: new Date(w.start_date + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
  }));

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Histórico de conclusão (%)
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={formatted} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `${v}%`} />
          <Line
            type="monotone"
            dataKey="completion_rate"
            name="Taxa de conclusão"
            stroke="#7b1fa2"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}