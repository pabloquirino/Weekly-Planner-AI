import { Box, Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export function MetricCard({ label, value, icon, color }: Props) {
  return (
    <Card variant="outlined" sx={{ flex: 1, minWidth: 160 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Box
            sx={{
              bgcolor: `${color}18`,
              color,
              borderRadius: 2,
              p: 1,
              display: "flex",
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}