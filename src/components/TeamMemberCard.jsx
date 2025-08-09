import React from "react";

const TeamMemberCard = ({
  name,
  role,
  team,
  email,
  status,
  workload,
  taskCount,
  metrics,
  onEdit,
  onDelete,
}) => {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  const avatarInitials = getInitials(name);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 max-w-sm mx-auto transition-all duration-200 hover:shadow-md">
      {/* Avatar */}
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
          {avatarInitials}
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <p>
          <span className="font-medium">Team:</span> {team}
        </p>
        <p>
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {email}
          </a>
        </p>
        <p className="flex items-center">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              status === "Active" ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
          <span>{status}</span>
        </p>
      </div>

      {/* Workload */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Workload</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              workload > 80 ? "bg-red-500" : "bg-blue-600"
            }`}
            style={{ width: `${workload}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{workload}%</p>
      </div>

      {/* Task Count */}
      <p className="text-sm text-gray-700 mb-4">
        <span className="font-medium">Tasks:</span> {taskCount.active} active / {taskCount.total} total
      </p>

      {/* Performance Metrics */}
      <div className="bg-gray-50 rounded-lg p-4 mb-5 space-y-2 text-sm">
        <p>
          <span className="font-medium">Completion Rate:</span> {metrics.completionRate}%
        </p>
        <p>
          <span className="font-medium">Avg Task Time:</span> {metrics.avgTaskTime}
        </p>
        <p>
          <span className="font-medium">On-time Delivery:</span> {metrics.onTimeDelivery}%
        </p>
        <p>
          <span className="font-medium">Quality Score:</span> {metrics.qualityScore}/10
        </p>
        <p>
          <span className="font-medium">Collaboration:</span> {metrics.collaborationScore}/10
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeamMemberCard;