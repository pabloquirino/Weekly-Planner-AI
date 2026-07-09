import {
  AppBar, Box, Drawer, IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Tooltip, Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import HistoryIcon from "@mui/icons-material/History";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useLocation } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";

const DRAWER_WIDTH = 220;

const NAV = [
  { label: "Planner",   icon: <CalendarMonthIcon />, to: "/" },
  { label: "Dashboard", icon: <BarChartIcon />,       to: "/dashboard" },
  { label: "Insights",  icon: <AutoAwesomeIcon />,    to: "/insights" },
  { label: "Histórico", icon: <HistoryIcon />,        to: "/history" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { mode, toggle } = useThemeStore();

  return (
    <Box display="flex">
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }} elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700}>
            Weekly Planner AI
          </Typography>
          <Tooltip title={mode === "light" ? "Modo escuro" : "Modo claro"}>
            <IconButton color="inherit" onClick={toggle}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {NAV.map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={pathname === item.to}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          px: 3,
          py: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}