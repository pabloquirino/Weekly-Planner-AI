import { useQuery } from "@tanstack/react-query";
import { historyApi } from "../services/api";

interface Filters {
  preset?: string;
  start_date?: string;
  end_date?: string;
}

export function useHistory(filters: Filters) {
  return useQuery({
    queryKey: ["history", filters],
    queryFn: () => historyApi.get(filters),
  });
}