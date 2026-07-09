import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { App } from "./App";
import { useThemeStore } from "./store/themeStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function Root() {
  const { mode } = useThemeStore();

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: { default: "#121212", paper: "#1e1e1e" },
            primary: { main: "#90caf9" },
          }
        : {
            background: { default: "#f5f5f5", paper: "#ffffff" },
          }),
    },
    shape: { borderRadius: 10 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </React.StrictMode>
);