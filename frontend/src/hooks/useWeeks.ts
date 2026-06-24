import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { weeksApi } from "../services/api";

export function useWeeks() {
  return useQuery({ queryKey: ["weeks"], queryFn: weeksApi.list });
}

export function useWeek(id: number) {
  return useQuery({
    queryKey: ["weeks", id],
    queryFn: () => weeksApi.get(id),
    enabled: !!id,
  });
}

export function useCreateWeek() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (start_date: string) => weeksApi.create(start_date),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["weeks"] }),
  });
}

export function useDeleteWeek() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => weeksApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["weeks"] }),
  });
}

export function useDuplicateWeek() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => weeksApi.duplicate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["weeks"] }),
  });
}