import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../services/api";

export function useDashboard(weekId: number) {
  return useQuery({
    queryKey: ["dashboard", weekId],
    queryFn: () => dashboardApi.get(weekId),
    enabled: !!weekId,
  });
}