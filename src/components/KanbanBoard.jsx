import React from "react";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";

const STATUS_LIST = ["To Do", "In Progress", "In Review", "Done"];

const KanbanBoard = ({
  tasks = [],
  onEditTask,
  onDeleteTask,
  onTaskStatusChange, // new prop for status change
}) => {
  // Drag state
  const [draggedTaskId, setDraggedTaskId] = React.useState(null);

  // Group tasks by status
  const grouped = STATUS_LIST.map((status) => ({
    status,
    tasks: tasks.filter((t) => t.status === status),
  }));

  // Handle drop
  const handleDrop = (status) => {
    if (draggedTaskId && onTaskStatusChange) {
      onTaskStatusChange(draggedTaskId, status);
    }
    setDraggedTaskId(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto py-6 px-4">
      {grouped.map((col) => (
        <div
          key={col.status}
          onDragOver={e => e.preventDefault()}
          onDrop={() => handleDrop(col.status)}
          className="min-w-[300px]"
        >
          <TaskColumn title={col.status}>
            {col.tasks.length > 0
              ? col.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTaskId(task.id)}
                    onDragEnd={() => setDraggedTaskId(null)}
                  >
                    <TaskCard
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      assignee={task.assignee}
                      dueDate={task.dueDate}
                      tags={task.tags}
                      onEdit={() => onEditTask && onEditTask(task)}
                      onDelete={() => onDeleteTask && onDeleteTask(task)}
                    />
                  </div>
                ))
              : null}
          </TaskColumn>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;