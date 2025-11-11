import React, { useState, useEffect } from "react";
import { Modal } from "../Primitives/Modal";
import type { CalendarEvent } from "../../hooks/useEventManger";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
  initialData?: CalendarEvent | null;
  selectedDate?: Date;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  selectedDate,
}) => {
  const [formData, setFormData] = useState<CalendarEvent>({
    id: initialData?.id || crypto.randomUUID(),
    title: initialData?.title || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate || selectedDate || new Date(),
    endDate: initialData?.endDate || selectedDate || new Date(),
    color: initialData?.color || COLORS[0],
    category: initialData?.category || "",
  });

  // Sync when editing
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) return alert("Title is required");
    if (new Date(formData.endDate) < new Date(formData.startDate))
      return alert("End time must be after start time");

    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Event" : "Add Event"}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded px-2 py-1"
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-neutral-200 rounded px-2 py-1"
            rows={2}
            maxLength={500}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start</label>
            <input
              type="datetime-local"
              value={new Date(formData.startDate).toISOString().slice(0, 16)}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: new Date(e.target.value) }))
              }
              className="w-full border border-neutral-200 rounded px-2 py-1"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End</label>
            <input
              type="datetime-local"
              value={new Date(formData.endDate).toISOString().slice(0, 16)}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endDate: new Date(e.target.value) }))
              }
              className="w-full border border-neutral-200 rounded px-2 py-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <div className="flex gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 ${
                  formData.color === color ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setFormData((prev) => ({ ...prev, color }))}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          {initialData && onDelete && (
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => {
                onDelete(formData.id);
                onClose();
              }}
            >
              Delete
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button className="px-3 py-1 bg-neutral-200 rounded" onClick={onClose}>
              Cancel
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
