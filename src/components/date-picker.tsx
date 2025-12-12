"use client";

import { useState } from "react";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Leave {
  date: string; // YYYY-MM-DD format
  person: string;
}

const PEOPLE = [
  "Nuwanga",
  "Charuka",
  "Pramodi",
  "Lahiru",
  "Dileka",
  "Lasith",
  "Ashen",
  "Dedunu",
  "Warsha",
];

export function DatePicker() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 12)); // December 12, 2025
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    selectedDate: string | null;
    selectedPersons: string[];
  }>({
    isOpen: false,
    selectedDate: null,
    selectedPersons: [],
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDayClick = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateString = date.toISOString().split("T")[0];
    const existingLeaves = leaves.filter((l) => l.date === dateString);
    const existingPersons = existingLeaves.map((l) => l.person);

    setModalState({
      isOpen: true,
      selectedDate: dateString,
      selectedPersons: existingPersons,
    });
  };

  const togglePerson = (person: string) => {
    setModalState((prev) => ({
      ...prev,
      selectedPersons: prev.selectedPersons.includes(person)
        ? prev.selectedPersons.filter((p) => p !== person)
        : [...prev.selectedPersons, person],
    }));
  };

  const saveLeaves = () => {
    if (!modalState.selectedDate) return;

    const updatedLeaves = leaves.filter(
      (l) => l.date !== modalState.selectedDate
    );

    const newLeaves = modalState.selectedPersons.map((person) => ({
      date: modalState.selectedDate!,
      person,
    }));

    setLeaves([...updatedLeaves, ...newLeaves]);
    closeModal();
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      selectedDate: null,
      selectedPersons: [],
    });
  };

  const hasLeaveOnDate = (day: number): boolean => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateString = date.toISOString().split("T")[0];
    return leaves.some((l) => l.date === dateString);
  };

  const getLeavePeopleOnDate = (dateString: string): string[] => {
    return leaves.filter((l) => l.date === dateString).map((l) => l.person);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="p-1 text-center text-xs text-slate-500"
        ></div>
      );
    }

    // Days of the month
    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth();

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const hasLeave = hasLeaveOnDate(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={`p-0.5 text-xs font-medium rounded transition-colors ${
            isToday
              ? "bg-blue-600 text-white font-bold"
              : hasLeave
              ? "bg-orange-600 text-orange-100 font-semibold"
              : "hover:bg-slate-700 text-slate-300"
          }`}
          title={hasLeave ? "Has leaves marked" : "Click to mark leave"}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <>
      <SidebarGroup className="px-0">
        <SidebarGroupContent>
          <div className="bg-slate-800 rounded-lg shadow-sm border border-slate-700 p-2 max-w-xs">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={handlePreviousMonth}
                className="p-0.5 hover:bg-slate-700 rounded transition text-slate-300"
              >
                <ChevronLeft size={16} />
              </button>
              <h3 className="text-xs font-bold text-slate-100">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-0.5 hover:bg-slate-700 rounded transition text-slate-300"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-slate-300"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0.5">{renderCalendar()}</div>

            {/* Legend */}
            <div className="mt-2 pt-2 border-t border-slate-700 space-y-0.5 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded"></div>
                <span className="text-slate-300 text-xs">Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-600 rounded border border-orange-500"></div>
                <span className="text-slate-300 text-xs">Has leaves</span>
              </div>
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Leave Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-slate-700">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Mark Leave</h3>
            <p className="text-sm text-slate-300 mb-4">
              Date: {modalState.selectedDate}
            </p>

            {/* Current leaves for this date */}
            {getLeavePeopleOnDate(modalState.selectedDate || "").length > 0 && (
              <div className="mb-4 p-3 bg-slate-700 rounded border border-orange-600">
                <p className="text-xs font-semibold text-orange-300 mb-2">
                  Currently on leave:
                </p>
                <div className="flex flex-wrap gap-2">
                  {getLeavePeopleOnDate(modalState.selectedDate || "").map(
                    (person) => (
                      <span
                        key={person}
                        className="bg-orange-600 text-orange-100 px-2 py-1 rounded text-xs font-medium"
                      >
                        {person}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            <p className="text-sm font-medium text-slate-100 mb-3">
              Select who is on leave:
            </p>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {PEOPLE.map((person) => (
                <label
                  key={person}
                  className="flex items-center gap-3 p-2 hover:bg-slate-700 rounded cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={modalState.selectedPersons.includes(person)}
                    onChange={() => togglePerson(person)}
                    className="w-4 h-4 rounded border-slate-600 cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm text-slate-300">{person}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-md transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveLeaves}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
