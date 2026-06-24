import axios from "axios";
import type { Week, Task } from "../types";

const http = axios.create({ baseURL: "/api/v1" });

// Weeks
export const weeksApi = {
  list: () => http.get<Week[]>("/weeks/").then((r) => r.data),
  get: (id: number) => http.get<Week>(`/weeks/${id}`).then((r) => r.data),
  create: (start_date: string) =>
    http.post<Week>("/weeks/", { start_date }).then((r) => r.data),
  delete: (id: number) => http.delete(`/weeks/${id}`),
  duplicate: (id: number) =>
    http.post<Week>(`/weeks/${id}/duplicate`).then((r) => r.data),
};

// Tasks
export const tasksApi = {
  create: (
    weekId: number,
    data: { day_of_week: string; title: string; description?: string }
  ) =>
    http
      .post<Task>(`/weeks/${weekId}/tasks/`, data)
      .then((r) => r.data),

  update: (
    weekId: number,
    taskId: number,
    data: Partial<{ title: string; description: string; day_of_week: string; learning_notes: string }>
  ) =>
    http
      .patch<Task>(`/weeks/${weekId}/tasks/${taskId}`, data)
      .then((r) => r.data),

  complete: (weekId: number, taskId: number, learning_notes?: string) =>
    http
      .post<Task>(`/weeks/${weekId}/tasks/${taskId}/complete`, {
        learning_notes,
      })
      .then((r) => r.data),

  uncomplete: (weekId: number, taskId: number) =>
    http
      .post<Task>(`/weeks/${weekId}/tasks/${taskId}/uncomplete`)
      .then((r) => r.data),

  duplicate: (weekId: number, taskId: number) =>
    http
      .post<Task>(`/weeks/${weekId}/tasks/${taskId}/duplicate`)
      .then((r) => r.data),

  delete: (weekId: number, taskId: number) =>
    http.delete(`/weeks/${weekId}/tasks/${taskId}`),
};