import React from "react";

const teamWorkload = [
  { name: "Avinash", tasks: 12, color: "bg-blue-400" },
  { name: "Aman Kumar", tasks: 8, color: "bg-green-400" },
  { name: "Harsh ", tasks: 15, color: "bg-yellow-400" },
  { name: "Kislay", tasks: 5, color: "bg-pink-400" },
];

const maxTasks = Math.max(...teamWorkload.map((m) => m.tasks));

const TeamWorkload = () => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Team Workload</h2>
    <div className="space-y-4">
      {teamWorkload.map((member) => (
        <div key={member.name}>
          <div className="flex justify-between mb-1">
            <span className="font-medium">{member.name}</span>
            <span className="text-sm">{member.tasks} tasks</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`${member.color} h-4 rounded-full`}
              style={{ width: `${(member.tasks / maxTasks) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TeamWorkload;