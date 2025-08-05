import React from "react";

const activities = [
  {
    id: 1,
    user: "Alice",
    action: "completed task",
    target: "Design Homepage",
    time: "5 min ago",
  },
  {
    id: 2,
    user: "Bob",
    action: "commented on",
    target: "API Integration",
    time: "12 min ago",
  },
  {
    id: 3,
    user: "Charlie",
    action: "added new task",
    target: "Write Unit Tests",
    time: "30 min ago",
  },
  {
    id: 4,
    user: "Diana",
    action: "marked task overdue",
    target: "Client Feedback",
    time: "1 hr ago",
  },
];

const RecentActivityFeed = () => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
    <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
      {activities.map((activity) => (
        <li key={activity.id} className="p-4 flex items-center">
          <div className="flex-1">
            <span className="font-medium text-blue-600">{activity.user}</span>{" "}
            {activity.action}{" "}
            <span className="font-semibold">{activity.target}</span>
            <div className="text-xs text-gray-400">{activity.time}</div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivityFeed;