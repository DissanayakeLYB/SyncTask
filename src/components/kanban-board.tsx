import { useState, useEffect } from "react";
import { Trash2, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Task {
  id: string;
  title: string;
  deadline: string;
  level: "todo" | "working" | "done";
  tags: string[];
}

interface ApiTask {
  taskDescription: string;
  status: "todo" | "working" | "done";
  responsible: string[];
}

interface LeaveDate {
  year: number;
  month: number;
  day: number;
}

interface Leave {
  name: string;
  leave_dates: LeaveDate[];
}

interface ModalState {
  isOpen: boolean;
  type: "delete" | "move" | null;
  task: Task | null;
  newLevel?: "todo" | "working" | "done";
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

export default function KanbanBoard({
  selectedPerson,
}: {
  selectedPerson: string | null;
}) {
  const [taskLevel, _] = useState("todo");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskInput, setTaskInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
    task: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([getTaskDetails(), getLeaveDetails()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function addTask() {
    if (taskInput && deadlineInput) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskInput,
        deadline: deadlineInput,
        level: taskLevel as "todo" | "working" | "done",
        tags: selectedTags,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setDeadlineInput("");
      setSelectedTags([]);
    } else {
      alert("Please enter both task and deadline.");
    }
  }

  function openDeleteModal(task: Task) {
    setModalState({
      isOpen: true,
      type: "delete",
      task,
    });
  }

  function openMoveModal(task: Task, newLevel: "todo" | "working" | "done") {
    setModalState({
      isOpen: true,
      type: "move",
      task,
      newLevel,
    });
  }

  function closeModal() {
    setModalState({
      isOpen: false,
      type: null,
      task: null,
    });
  }

  function confirmDelete() {
    if (modalState.task) {
      setTasks(tasks.filter((task) => task.id !== modalState.task!.id));
    }
    closeModal();
  }

  function confirmMove() {
    if (modalState.task && modalState.newLevel) {
      setTasks(
        tasks.map((task) =>
          task.id === modalState.task!.id
            ? { ...task, level: modalState.newLevel! }
            : task
        )
      );
    }
    closeModal();
  }

  function handleConfirm() {
    if (modalState.type === "delete") {
      confirmDelete();
    } else if (modalState.type === "move") {
      confirmMove();
    }
  }

  function getNextLevel(
    currentLevel: "todo" | "working" | "done"
  ): "todo" | "working" | "done" | null {
    if (currentLevel === "todo") return "working";
    if (currentLevel === "working") return "done";
    return null;
  }

  function getPreviousLevel(
    currentLevel: "todo" | "working" | "done"
  ): "todo" | "working" | "done" | null {
    if (currentLevel === "done") return "working";
    if (currentLevel === "working") return "todo";
    return null;
  }

  const getFilteredTasks = () => {
    if (!selectedPerson) {
      return tasks;
    }
    return tasks.filter((task) => task.tags.includes(selectedPerson));
  };

  const getTaskDetails = async () => {
    const tasksDetails = await fetch(
      "https://sync-task-uom-mse-instructors-backend.vercel.app/tasks"
    );
    const taskData: ApiTask[] = await tasksDetails.json();

    // Transform API tasks to our Task interface
    const transformedTasks: Task[] = taskData
      .filter((task): task is ApiTask => task !== null) // Filter out null entries
      .map((task, index) => ({
        id: `api-${index}-${Date.now()}`,
        title: task.taskDescription,
        deadline: "Not specified",
        level: task.status,
        tags: task.responsible.map(
          (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        ),
      }));

    setTasks((prevTasks) => [...transformedTasks, ...prevTasks]);
  };

  const getLeaveDetails = async () => {
    const leavesDetails = await fetch(
      "https://sync-task-uom-mse-instructors-backend.vercel.app/leaves"
    );
    const leavesData: Leave[] = await leavesDetails.json();
    setLeaves(leavesData);
  };

  // Helper function to format leave dates
  const formatLeaveDate = (date: LeaveDate): string => {
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(
      date.day
    ).padStart(2, "0")}`;
  };

  // Check if a person is on leave today or upcoming
  const getPersonLeaveInfo = (personName: string): LeaveDate[] => {
    const personLeave = leaves.find(
      (leave) => leave.name.toLowerCase() === personName.toLowerCase()
    );
    return personLeave?.leave_dates || [];
  };

  const renderTasks = (level: string) => {
    const filteredTasks = getFilteredTasks();
    return filteredTasks
      .filter((task) => task.level === level)
      .map((task) => {
        const nextLevel = getNextLevel(task.level);
        const prevLevel = getPreviousLevel(task.level);

        return (
          <div
            key={task.id}
            className="border border-slate-600 p-3 my-2 rounded-md bg-slate-800 shadow-sm mx-2"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">{task.title}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => openDeleteModal(task)}
                  className="cursor-pointer text-red-500 hover:text-red-700 transition"
                  title="Delete task"
                >
                  <Trash2 size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              Deadline: {task.deadline}
            </p>
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-700 border border-slate-600 px-2 py-1 rounded-md text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2 justify-between">
              {prevLevel && (
                <button
                  onClick={() => openMoveModal(task, prevLevel)}
                  className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition text-slate-200"
                  title={`Move to ${prevLevel}`}
                >
                  <ChevronLeft size={14} />
                  {prevLevel}
                </button>
              )}
              {nextLevel && (
                <button
                  onClick={() => openMoveModal(task, nextLevel)}
                  className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition ml-auto text-slate-200"
                  title={`Move to ${nextLevel}`}
                >
                  {nextLevel}
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        );
      });
  };

  return (
    <section className="bg-slate-950 min-h-screen">
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="text-slate-400">Loading tasks...</div>
        </div>
      )}
      <div className="flex flex-col gap-4 mb-8 px-8 pt-4">
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter the task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="border border-slate-600 bg-slate-800 text-white placeholder-slate-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={deadlineInput}
              onChange={(e) => setDeadlineInput(e.target.value)}
              className="border border-slate-600 bg-slate-800 text-white p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PEOPLE.map((person) => {
              const active = selectedTags.includes(person);
              const personLeaves = getPersonLeaveInfo(person);
              const hasUpcomingLeave = personLeaves.length > 0;
              return (
                <button
                  key={person}
                  type="button"
                  onClick={() => toggleTag(person)}
                  className={`px-3 py-1 text-sm rounded-full border transition flex items-center gap-1 ${
                    active
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                  }`}
                  title={
                    hasUpcomingLeave
                      ? `${person} - On leave: ${personLeaves
                          .map((d) => formatLeaveDate(d))
                          .join(", ")}`
                      : `Tag ${person}`
                  }
                >
                  {person}
                  {hasUpcomingLeave && (
                    <Calendar size={12} className="text-yellow-400" />
                  )}
                </button>
              );
            })}
          </div>
          <div>
            <input
              type="button"
              className="py-2 px-4 rounded-lg font-semibold text-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-md transition"
              value="Add Task"
              onClick={addTask}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-evenly">
          <div className="rounded-b-xl">
            <div className="p-4 bg-red-600 rounded-xl text-white">
              <h3 className="font-bold text-2xl">Todo</h3>
              <p>
                {getFilteredTasks().filter((t) => t.level === "todo").length}{" "}
                task(s)
              </p>
            </div>
            <div id="todo">{renderTasks("todo")}</div>
          </div>
          <div className="rounded-b-xl">
            <div className="p-4 bg-yellow-600 rounded-xl text-white">
              <h3 className="font-bold text-2xl">Working</h3>
              <p>
                {getFilteredTasks().filter((t) => t.level === "working").length}{" "}
                task(s)
              </p>
            </div>
            <div id="working">{renderTasks("working")}</div>
          </div>
          <div className="rounded-b-xl">
            <div className="p-4 bg-green-600 rounded-xl text-white">
              <h3 className="font-bold text-2xl">Done</h3>
              <p>
                {getFilteredTasks().filter((t) => t.level === "done").length}{" "}
                task(s)
              </p>
            </div>
            <div id="done">{renderTasks("done")}</div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl border border-slate-700">
            {modalState.type === "delete" && (
              <>
                <h3 className="text-xl font-bold mb-4 text-red-500">
                  Confirm Delete
                </h3>
                <p className="mb-6 text-slate-300">
                  Are you sure you want to delete the task "
                  {modalState.task?.title}"?
                </p>
              </>
            )}
            {modalState.type === "move" && (
              <>
                <h3 className="text-xl font-bold mb-4 text-blue-400">
                  Confirm Move
                </h3>
                <p className="mb-6 text-slate-300">
                  Are you sure you want to move "{modalState.task?.title}" to{" "}
                  <span className="font-semibold">{modalState.newLevel}</span>?
                </p>
              </>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-md text-white transition ${
                  modalState.type === "delete"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
