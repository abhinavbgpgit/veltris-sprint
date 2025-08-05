import React from "react";

const priorityColors = {
  High: "text-red-500",
  Medium: "text-yellow-500",
  Low: "text-green-500",
};

const TaskCard = ({
  title,
  description,
  priority,
  assignee,
  dueDate,
  tags = [],
  onEdit,
  onDelete,
}) => (
  <div className="bg-white rounded shadow p-3 flex flex-col gap-2 hover:shadow-lg transition group">
    <div className="flex justify-between items-center">
      <span className="font-semibold">{title || "[Task Title]"}</span>
      <span className="text-gray-400 cursor-pointer" title="More actions">⋮</span>
    </div>
    <div className="text-gray-500 text-sm line-clamp-2">{description || "[No description]"}</div>
    <div className="flex gap-2 items-center text-xs mt-2 flex-wrap">
      {priority && (
        <span className={priorityColors[priority] || "text-gray-400"}>
          ● {priority}
        </span>
      )}
      {assignee && <span>👤 {assignee}</span>}
      {dueDate && <span>📅 {dueDate}</span>}
      {tags.map((tag, i) => (
        <span
          key={i}
          className={`bg-blue-100 text-blue-700 rounded px-1`}
        >
          #{tag}
        </span>
      ))}
    </div>
    <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
      <button
        className="btn btn-xs btn-secondary"
        onClick={onEdit}
        aria-label="Edit Task"
      >
        Edit
      </button>
      <button
        className="btn btn-xs btn-danger"
        onClick={onDelete}
        aria-label="Delete Task"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskCard;