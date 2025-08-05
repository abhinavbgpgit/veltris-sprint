import React from "react";
import TaskStatisticsCards from "./TaskStatisticsCards";
import TeamWorkload from "./TeamWorkload";
import RecentActivityFeed from "./RecentActivityFeed";
import UpcomingDeadlines from "./UpcomingDeadlines";

const DashboardHome = () => (
  <div className="p-8 min-h-[80vh] bg-[#f5f6fa]">
    <h1 className="text-4xl font-bold text-blue-600 mb-8">Dashboard</h1>
    <TaskStatisticsCards />
    <TeamWorkload />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <RecentActivityFeed />
      <UpcomingDeadlines />
    </div>
  </div>
);

export default DashboardHome;