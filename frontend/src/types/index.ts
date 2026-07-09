export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Segunda",
  tuesday: "Terça",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
};

export const DAYS: DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

export interface Task {
  id: number;
  week_id: number;
  day_of_week: DayOfWeek;
  title: string;
  description: string | null;
  is_completed: boolean;
  completed_at: string | null;
  learning_notes: string | null;
  created_at: string;
}

export interface Week {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  tasks: Task[];
}

export interface WeekSummary {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface DayStats {
  day: string;
  total: number;
  completed: number;
}

export interface WeekHistory {
  week_id: number;
  start_date: string;
  completion_rate: number;
  total: number;
  completed: number;
}

export interface DashboardData {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  completion_rate: number;
  by_day: DayStats[];
  history: WeekHistory[];
}

export interface WeeklyAnalysis {
  id: number;
  week_id: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  skills_breakdown: Record<string, number>;
  next_steps: string[];
  generated_at: string;
}

export interface TaskHistory {
  id: number;
  day_of_week: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  completed_at: string | null;
  learning_notes: string | null;
}

export interface AnalysisSummary {
  summary: string;
  generated_at: string;
}

export interface WeekHistoryItem {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  total_tasks: number;
  completed_tasks: number;
  completion_rate: number;
  tasks: TaskHistory[];
  analysis: AnalysisSummary | null;
}

export interface HistoryResponse {
  weeks: WeekHistoryItem[];
  total: number;
}