import { getCalendarGrid,isSameDay } from "../../utils/date.utils";
import type { CalendarEvent } from "../../hooks/useEventManger";
import { CalendarCell } from "./CalendarCell";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick,
}) => {
  const days = getCalendarGrid(currentDate);

  const getEventsForDate = (day: Date) =>
    events.filter((evt) => isSameDay(evt.startDate, day));

  return (
    <div className="grid grid-cols-7 border-t border-l">
      {days.map((day, idx) => (
        <CalendarCell
          key={idx}
          date={day}
          monthDate={currentDate}
          events={getEventsForDate(day)}
          onDayClick={onDayClick}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};
