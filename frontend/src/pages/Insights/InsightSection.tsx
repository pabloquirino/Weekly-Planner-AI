import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  title: string;
  icon: string;
  color: string;
  children: ReactNode;
}

export function InsightSection({ title, icon, color, children }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderLeft: `4px solid ${color}` }}>
      <Typography variant="subtitle1" fontWeight={700} mb={1.5}>
        {icon} {title}
      </Typography>
      {children}
    </Paper>
  );
}