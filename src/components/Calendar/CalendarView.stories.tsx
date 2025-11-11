import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import { useState } from "react";
import type { CalendarEvent } from "../../hooks/useEventManger";

// Sample event data
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Standup",
    startDate: new Date(2025, 10, 9, 10, 0),
    endDate: new Date(2025, 10, 9, 10, 30),
    color: "#3b82f6",
    category: "Meeting",
  },
  {
    id: "2",
    title: "Design Review",
    startDate: new Date(2025, 10, 10, 14, 0),
    endDate: new Date(2025, 10, 10, 15, 0),
    color: "#10b981",
    category: "Design",
  },
  {
    id: "3",
    title: "Client Call",
    startDate: new Date(2025, 10, 11, 16, 0),
    endDate: new Date(2025, 10, 11, 17, 0),
    color: "#f59e0b",
    category: "Work",
  },
];

const meta: Meta<typeof CalendarView> = {
  title: "Calendar/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// Helper wrapper for interactive states
const Wrapper = ({ initialEvents = sampleEvents }: { initialEvents?: CalendarEvent[] }) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const handleAdd = (event: CalendarEvent) => setEvents((prev) => [...prev, event]);
  const handleUpdate = (id: string, updates: Partial<CalendarEvent>) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  const handleDelete = (id: string) => setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <CalendarView />
    </div>
  );
};

// 1️⃣ Default Story - current month with sample events
export const Default: Story = {
  render: () => <Wrapper />,
};

// 2️⃣ Empty State
export const Empty: Story = {
  render: () => <Wrapper initialEvents={[]} />,
};

// 3️⃣ Week View - starts with week mode manually (mocked)
export const WeekView: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-6">
      <CalendarView />
      <p className="mt-4 text-center text-sm text-gray-500">Switch to Week View from toggle button</p>
    </div>
  ),
};

// 4️⃣ Many Events
export const ManyEvents: Story = {
  render: () => {
    const events = Array.from({ length: 25 }, (_, i) => ({
      id: `e${i}`,
      title: `Event ${i + 1}`,
      startDate: new Date(2025, 10, (i % 28) + 1, 9),
      endDate: new Date(2025, 10, (i % 28) + 1, 10),
      color: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"][i % 4],
    }));
    return (
      <div className="min-h-screen bg-neutral-50 p-6">
        <CalendarView />
        <p className="mt-4 text-center text-sm text-gray-500">
          Loaded {events.length} sample events
        </p>
      </div>
    );
  },
};

// 5️⃣ Interactive Demo
export const Interactive: Story = {
  render: () => <Wrapper />,
};
