import { create } from "zustand";

interface WeekStore {
  selectedWeekId: number | null;
  setSelectedWeekId: (id: number) => void;
}

export const useWeekStore = create<WeekStore>((set) => ({
  selectedWeekId: null,
  setSelectedWeekId: (id) => set({ selectedWeekId: id }),
}));