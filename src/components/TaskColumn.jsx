import React from "react";

const TaskColumn = ({ title, children }) => (
  <div className="min-w-[300px] bg-gray-100 rounded-lg shadow p-3 flex flex-col gap-2">
    <div className="font-semibold text-lg mb-2">{title}</div>
    <div className="flex flex-col gap-2">
      {children || <div className="text-gray-400">[No tasks]</div>}
    </div>
  </div>
);

export default TaskColumn;