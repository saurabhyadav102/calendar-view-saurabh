// Helper functions for calendar date calculations

// Returns all 42 days (6 weeks × 7 days) for month grid
export const getCalendarGrid = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // First day of this month
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // Sunday = 0

  // Start from Sunday before (or on) the first day
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDay);

  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    grid.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return grid;
};

// Check if two dates fall on same day
export const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Check if a date belongs to the current displayed month
export const isSameMonth = (refDate: Date, compareDate: Date) => {
  return (
    refDate.getFullYear() === compareDate.getFullYear() &&
    refDate.getMonth() === compareDate.getMonth()
  );
};
