import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: { mode: "light" },
});

function App() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Weekly Planner AI 🚀</h1>
      <p>Infraestrutura rodando com sucesso.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);