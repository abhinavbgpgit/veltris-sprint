import React from "react";

const stats = [
  { label: "Total Tasks", value: 120, color: "bg-blue-500" },
  { label: "In Progress", value: 35, color: "bg-yellow-500" },
  { label: "Completed", value: 70, color: "bg-green-500" },
  { label: "Overdue", value: 15, color: "bg-red-500" },
];

const TaskStatisticsCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className={`rounded-lg shadow-md p-6 flex flex-col items-center ${stat.color} text-white`}
      >
        <div className="text-3xl font-bold mb-2">{stat.value}</div>
        <div className="text-lg">{stat.label}</div>
      </div>
    ))}
  </div>
);

export default TaskStatisticsCards;