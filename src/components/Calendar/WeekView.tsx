import type { CalendarEvent } from "../../hooks/useEventManger";
import dayjs from "dayjs";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onSlotClick: (date: Date) => void;
}

// Utility: get start of current week (Sunday)
const getStartOfWeek = (date: Date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

// Utility: get all days in the current week
const getWeekDays = (date: Date) => {
  const start = getStartOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onSlotClick,
}) => {
  const weekDays = getWeekDays(currentDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Get events for a specific day
  const getEventsForDay = (day: Date) =>
    events.filter((evt) =>
      dayjs(evt.startDate).isSame(day, "day")
    );

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      {/* Header: days of week */}
      <div className="grid grid-cols-8 bg-neutral-50 border-b">
        <div className="p-2 text-xs font-semibold text-neutral-500 text-right">Time</div>
        {weekDays.map((d, i) => (
          <div
            key={i}
            className="p-2 text-center text-xs font-semibold text-neutral-700 border-l"
          >
            {d.toLocaleDateString("en-US", { weekday: "short" })}{" "}
            <span className="text-neutral-400">{d.getDate()}</span>
          </div>
        ))}
      </div>

      {/* Grid body: time slots + events */}
      <div className="relative grid grid-cols-8 max-h-[80vh] overflow-y-auto">
        {/* Time column */}
        <div className="flex flex-col text-xs text-right text-neutral-400 border-r">
          {hours.map((hour) => (
            <div key={hour} className="h-16 pr-2">
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="relative border-l border-neutral-100"
            onClick={(e) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              const y = e.clientY - rect.top;
              const hour = Math.floor(y / 64); // each 64px = 1 hour
              const slotTime = new Date(day);
              slotTime.setHours(hour, 0, 0, 0);
              onSlotClick(slotTime);
            }}
          >
            {/* Hour lines */}
            {hours.map((_, h) => (
              <div key={h} className="h-16 border-b border-neutral-100"></div>
            ))}

            {/* Events */}
            {getEventsForDay(day).map((evt) => {
              const startHour = dayjs(evt.startDate).hour() + dayjs(evt.startDate).minute() / 60;
              const endHour = dayjs(evt.endDate).hour() + dayjs(evt.endDate).minute() / 60;
              const top = startHour * 64; // 1 hour = 64px height
              const height = (endHour - startHour) * 64;

              return (
                <div
                  key={evt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(evt);
                  }}
                  className="absolute left-1 right-1 text-xs text-white px-2 py-1 rounded shadow-md cursor-pointer overflow-hidden"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: evt.color || "#3b82f6",
                  }}
                >
                  {evt.title}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
