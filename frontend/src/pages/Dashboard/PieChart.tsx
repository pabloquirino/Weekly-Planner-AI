import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  completed: number;
  pending: number;
}

export function TaskPieChart({ completed, pending }: Props) {
  const data = [
    { name: "Concluídas", value: completed },
    { name: "Pendentes", value: pending },
  ];

  const COLORS = ["#2e7d32", "#ed6c02"];

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Concluídas vs Pendentes
      </Typography>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}