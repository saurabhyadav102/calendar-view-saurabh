import { useState, useCallback } from "react";

export type CalendarViewType = "month" | "week";

interface CalendarState {
  currentDate: Date;
  view: CalendarViewType;
  selectedDate: Date | null;
}

export const useCalendar = (initialDate: Date = new Date()) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: "month",
    selectedDate: null,
  });

  // Go to next month or week
  const goToNext = useCallback(() => {
    setState((prev) => {
      const newDate =
        prev.view === "month"
          ? new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1, 1)
          : new Date(prev.currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // next week
      return { ...prev, currentDate: newDate };
    });
  }, []);

  // Go to previous month or week
  const goToPrevious = useCallback(() => {
    setState((prev) => {
      const newDate =
        prev.view === "month"
          ? new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1, 1)
          : new Date(prev.currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // previous week
      return { ...prev, currentDate: newDate };
    });
  }, []);

  // Go to today
  const goToToday = useCallback(() => {
    setState((prev) => ({ ...prev, currentDate: new Date() }));
  }, []);

  // Toggle between month and week view
  const toggleView = useCallback(() => {
    setState((prev) => ({
      ...prev,
      view: prev.view === "month" ? "week" : "month",
    }));
  }, []);

  // Select a specific date
  const selectDate = useCallback((date: Date) => {
    setState((prev) => ({ ...prev, selectedDate: date }));
  }, []);

  return {
    ...state,
    goToNext,
    goToPrevious,
    goToToday,
    toggleView,
    selectDate,
  };
};
