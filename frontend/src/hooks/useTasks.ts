import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../services/api";

function invalidate(qc: ReturnType<typeof useQueryClient>, weekId: number) {
  qc.invalidateQueries({ queryKey: ["weeks", weekId] });
  qc.invalidateQueries({ queryKey: ["weeks"] });
}

export function useCreateTask(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { day_of_week: string; title: string; description?: string }) =>
      tasksApi.create(weekId, data),
    onSuccess: () => invalidate(qc, weekId),
  });
}

export function useUpdateTask(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, data }: { taskId: number; data: Parameters<typeof tasksApi.update>[2] }) =>
      tasksApi.update(weekId, taskId, data),
    onSuccess: () => invalidate(qc, weekId),
  });
}

export function useCompleteTask(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, notes }: { taskId: number; notes?: string }) =>
      tasksApi.complete(weekId, taskId, notes),
    onSuccess: () => invalidate(qc, weekId),
  });
}

export function useUncompleteTask(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (taskId: number) => tasksApi.uncomplete(weekId, taskId),
    onSuccess: () => invalidate(qc, weekId),
  });
}

export function useDuplicateTask(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (taskId: number) => tasksApi.duplicate(weekId, taskId),
    onSuccess: () => invalidate(qc, weekId),
  });
}

export function useDeleteTask(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (taskId: number) => tasksApi.delete(weekId, taskId),
    onSuccess: () => invalidate(qc, weekId),
  });
}