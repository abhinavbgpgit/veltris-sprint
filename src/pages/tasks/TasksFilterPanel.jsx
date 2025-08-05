import React from "react";

const TasksFilterPanel = ({
  statusOptions = [],
  selectedStatus = [],
  onStatusChange,
  priorityOptions = [],
  selectedPriority = [],
  onPriorityChange,
  assigneeOptions = [],
  selectedAssignees = [],
  onAssigneeChange,
  teamOptions = [],
  selectedTeams = [],
  onTeamChange,
  onClear,
  onApply,
}) => (
  <aside className="w-full bg-gray-50 border-b px-6 py-4">
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div>
          <label className="block font-semibold mb-1">Status:</label>
          <select
            multiple
            className="border rounded px-2 py-1"
            value={selectedStatus}
            onChange={e =>
              onStatusChange(Array.from(e.target.selectedOptions, o => o.value))
            }
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Priority:</label>
          <select
            multiple
            className="border rounded px-2 py-1"
            value={selectedPriority}
            onChange={e =>
              onPriorityChange(Array.from(e.target.selectedOptions, o => o.value))
            }
          >
            {priorityOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Assignee:</label>
          <select
            multiple
            className="border rounded px-2 py-1"
            value={selectedAssignees}
            onChange={e =>
              onAssigneeChange(Array.from(e.target.selectedOptions, o => o.value))
            }
          >
            {assigneeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Team:</label>
          <select
            multiple
            className="border rounded px-2 py-1"
            value={selectedTeams}
            onChange={e =>
              onTeamChange(Array.from(e.target.selectedOptions, o => o.value))
            }
          >
            {teamOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-secondary" onClick={onClear}>Clear Filters</button>
        <button className="btn btn-primary" onClick={onApply}>Apply Filters</button>
      </div>
    </div>
  </aside>
);

export default TasksFilterPanel;