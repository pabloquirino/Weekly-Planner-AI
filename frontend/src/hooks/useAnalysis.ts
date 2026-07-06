import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { analysisApi } from "../services/api";

export function useAnalysis(weekId: number) {
  return useQuery({
    queryKey: ["analysis", weekId],
    queryFn: () => analysisApi.get(weekId),
    enabled: !!weekId,
    retry: false, // 404 é esperado quando ainda não foi gerada
  });
}

export function useGenerateAnalysis(weekId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => analysisApi.generate(weekId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["analysis", weekId] }),
  });
}