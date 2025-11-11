import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { useEventManager, type CalendarEvent } from "../../hooks/useEventManger";
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { EventModal } from "./EventModal";

export const CalendarView = () => {
  const { currentDate, view, goToNext, goToPrevious, goToToday, toggleView } = useCalendar();
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager([
    {
      id: "1",
      title: "Team Meeting",
      startDate: new Date(),
      endDate: new Date(),
      color: "#3b82f6",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSave = (event: CalendarEvent) => {
    const exists = events.some((e) => e.id === event.id);
    exists ? updateEvent(event.id, event) : addEvent(event);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-x-2">
          <button className="px-3 py-1 bg-gray-100 rounded" onClick={goToPrevious}>◀</button>
          <button className="px-3 py-1 bg-gray-100 rounded" onClick={goToToday}>Today</button>
          <button className="px-3 py-1 bg-gray-100 rounded" onClick={goToNext}>▶</button>
        </div>

        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>

        <button onClick={toggleView} className="px-3 py-1 bg-blue-500 text-white rounded">
          {view === "month" ? "Switch to Week View" : "Switch to Month View"}
        </button>
      </div>

      {/* Calendar */}
      {view === "month" ? (
        <MonthView
          currentDate={currentDate}
          events={events}
          onDayClick={handleDayClick}
          onEventClick={handleEventClick}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          events={events}
          onSlotClick={handleDayClick}
          onEventClick={handleEventClick}
        />
      )}

      {/* Event Modal */}
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={deleteEvent}
        initialData={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};
