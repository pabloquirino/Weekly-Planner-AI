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