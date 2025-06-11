import { create } from "zustand";
import { Exam } from "../app/services";

interface ExamState {
  selectedExam: Exam | null;
  setSelectedExam: (exam: Exam | null) => void;
  refreshId: number;
  incrementRefreshId: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  selectedExam: null,
  refreshId: 0,
  setSelectedExam: (exam) => set({ selectedExam: exam }),
  incrementRefreshId: () =>
    set((state) => ({ refreshId: state.refreshId + 1 })),
}));
