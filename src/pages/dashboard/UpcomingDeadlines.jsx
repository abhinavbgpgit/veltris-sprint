import React from "react";

const deadlines = [
  {
    id: 1,
    task: "Submit Project Report",
    due: "2025-08-04",
    assignee: "Alice",
  },
  {
    id: 2,
    task: "Client Review Meeting",
    due: "2025-08-05",
    assignee: "Bob",
  },
  {
    id: 3,
    task: "Update Documentation",
    due: "2025-08-06",
    assignee: "Charlie",
  },
  {
    id: 4,
    task: "Release v2.0",
    due: "2025-08-07",
    assignee: "Diana",
  },
];

const UpcomingDeadlines = () => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
    <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
      {deadlines.map((item) => (
        <li key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-medium">{item.task}</span>
            <span className="ml-2 text-sm text-gray-500">({item.assignee})</span>
          </div>
          <div className="text-sm text-red-500 font-semibold mt-2 sm:mt-0">
            Due: {item.due}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default UpcomingDeadlines;