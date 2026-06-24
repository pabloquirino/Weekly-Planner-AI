import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { WeekPlannerPage } from "./pages/WeekPlanner";

function Placeholder({ label }: { label: string }) {
  return <div style={{ padding: 32 }}><h2>{label}</h2><p>Em breve.</p></div>;
}

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<WeekPlannerPage />} />
          <Route path="/dashboard" element={<Placeholder label="Dashboard" />} />
          <Route path="/history" element={<Placeholder label="Histórico" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}