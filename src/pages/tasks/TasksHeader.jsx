import React from "react";

const TasksHeader = ({ onCreateClick, onToggleFilters, filtersVisible }) => (
  <header className="flex items-center justify-between py-4 px-6 border-b bg-white">
    <h1 className="text-3xl font-bold">Tasks</h1>
    <div className="flex items-center gap-4">
      <button
        className="btn btn-primary flex items-center gap-2"
        onClick={onCreateClick}
      >
        <span className="text-xl font-bold">+</span> Create Task
      </button>
      <button
        className={`btn btn-secondary${filtersVisible ? " bg-blue-100" : ""}`}
        title="Toggle Filters"
        onClick={onToggleFilters}
        aria-pressed={filtersVisible}
      >
        <span className="material-icons">filter_alt</span>
      </button>
    </div>
  </header>
);

export default TasksHeader;