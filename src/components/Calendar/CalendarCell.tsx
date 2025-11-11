import type { CalendarEvent } from "../../hooks/useEventManger";
import { isSameDay,isSameMonth } from "../../utils/date.utils";

interface CalendarCellProps {
  date: Date;
  monthDate: Date; // current visible month
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  monthDate,
  events,
  onDayClick,
  onEventClick,
}) => {
  const today = new Date();
  const isToday = isSameDay(today, date);
  const inCurrentMonth = isSameMonth(monthDate, date);

  return (
    <div
      onClick={() => onDayClick(date)}
      className={`border border-neutral-200 h-32 p-2 cursor-pointer hover:bg-neutral-50 transition-colors
      ${!inCurrentMonth ? "bg-neutral-50 text-neutral-400" : ""}`}
    >
      {/* Top row: date number */}
      <div className="flex justify-between items-center mb-1">
        {isToday ? (
          <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
            {date.getDate()}
          </span>
        ) : (
          <span className="text-sm font-medium">{date.getDate()}</span>
        )}
      </div>

      {/* Events */}
      <div className="space-y-1 overflow-hidden">
        {events.slice(0, 3).map((evt) => (
          <div
            key={evt.id}
            className="text-xs px-2 py-1 rounded truncate"
            style={{ backgroundColor: evt.color || "#3b82f6" }}
            onClick={(e) => {
              e.stopPropagation(); // avoid triggering day click
              onEventClick(evt);
            }}
          >
            {evt.title}
          </div>
        ))}

        {events.length > 3 && (
          <button className="text-xs text-blue-600 hover:underline">
            +{events.length - 3} more
          </button>
        )}
      </div>
    </div>
  );
};
