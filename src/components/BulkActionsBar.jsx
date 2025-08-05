import React from "react";

const BulkActionsBar = () => (
  <div className="w-full bg-gray-200 py-2 px-4 flex items-center gap-4">
    <span className="font-semibold">Bulk Actions:</span>
    <button className="btn btn-xs btn-secondary">Change Status</button>
    <button className="btn btn-xs btn-secondary">Change Assignee</button>
    <button className="btn btn-xs btn-danger">Delete Selected</button>
  </div>
);

export default BulkActionsBar;