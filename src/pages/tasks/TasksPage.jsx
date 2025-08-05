import React, { useState } from "react";
import TasksHeader from "./TasksHeader";
import TasksFilterPanel from "./TasksFilterPanel";
import TaskCreateModal from "./TaskCreateModal";
import TaskEditModal from "./TaskEditModal";
import KanbanBoard from "../../components/KanbanBoard";
import BulkActionsBar from "../../components/BulkActionsBar";

const initialTasks = [
  {
    id: 1,
    title: "Design login page",
    description: "Create a responsive login page for the app.",
    status: "To Do",
    priority: "High",
    assignee: "John",
    dueDate: "2025-08-10",
    tags: ["frontend", "ui"],
  },
  {
    id: 2,
    title: "API integration",
    description: "Integrate authentication API.",
    status: "In Progress",
    priority: "Medium",
    assignee: "Sarah",
    dueDate: "2025-08-12",
    tags: ["backend", "api"],
  },
  {
    id: 3,
    title: "Write unit tests",
    description: "Add tests for user model.",
    status: "In Review",
    priority: "Low",
    assignee: "Mike",
    dueDate: "2025-08-15",
    tags: ["backend", "test"],
  },
  {
    id: 4,
    title: "Fix bug #123",
    description: "Resolve crash on dashboard load.",
    status: "Done",
    priority: "High",
    assignee: "Lisa",
    dueDate: "2025-08-05",
    tags: ["bug", "frontend"],
  },
];

const TasksPage = () => {
  // Modal and UI state
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  // Task state
  const [tasks, setTasks] = useState(initialTasks);

  // Filter state
  const statusOptions = ["To Do", "In Progress", "In Review", "Done"];
  const priorityOptions = ["Low", "Medium", "High"];
  const assigneeOptions = ["John", "Sarah", "Mike", "Lisa"];
  const teamOptions = ["FE", "BE", "QA"];

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleClearFilters = () => {
    setSelectedStatus([]);
    setSelectedPriority([]);
    setSelectedAssignees([]);
    setSelectedTeams([]);
  };

  const handleApplyFilters = () => {
    // For now, just log or stub
    // In future, filter tasks based on these values
    // console.log({ selectedStatus, selectedPriority, selectedAssignees, selectedTeams });
  };

  // Handlers for TaskCard actions
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleDeleteTask = (task) => {
    // For now, just alert. In real app, remove from state/server.
    alert(`Delete task: ${task.title}`);
  };

  // Drag-and-drop: update task status
  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TasksHeader
        onCreateClick={() => setCreateOpen(true)}
        onToggleFilters={() => setShowFilters((v) => !v)}
        filtersVisible={showFilters}
      />
      {showFilters && (
        <TasksFilterPanel
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          priorityOptions={priorityOptions}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          assigneeOptions={assigneeOptions}
          selectedAssignees={selectedAssignees}
          onAssigneeChange={setSelectedAssignees}
          teamOptions={teamOptions}
          selectedTeams={selectedTeams}
          onTeamChange={setSelectedTeams}
          onClear={handleClearFilters}
          onApply={handleApplyFilters}
        />
      )}
      <BulkActionsBar />
      <main className="flex-1">
        <KanbanBoard
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </main>
      <TaskCreateModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
      <TaskEditModal isOpen={isEditOpen} onClose={() => setEditOpen(false)} task={selectedTask} />
    </div>
  );
};

export default TasksPage;