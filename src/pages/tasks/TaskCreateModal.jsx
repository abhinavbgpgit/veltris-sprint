import React from "react";

import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  assignee: "",
  team: "",
  dueDate: "",
};

const statusOptions = ["To Do", "In Progress", "In Review", "Done"];
const priorityOptions = ["Low", "Medium", "High"];
const assigneeOptions = ["John", "Sarah", "Mike", "Lisa"];
const teamOptions = ["FE", "BE", "QA"];

const TaskCreateModal = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    // Add more validation as needed
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (onCreate) onCreate(form);
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1">Title<span className="text-red-500">*</span></label>
            <input
              className="border rounded px-2 py-1 w-full"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
            {errors.title && <div className="text-red-500 text-xs">{errors.title}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              className="border rounded px-2 py-1 w-full"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block font-semibold mb-1">Status</label>
              <select
                className="border rounded px-2 py-1"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Priority</label>
              <select
                className="border rounded px-2 py-1"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                {priorityOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block font-semibold mb-1">Assignee</label>
              <select
                className="border rounded px-2 py-1"
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                {assigneeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Team</label>
              <select
                className="border rounded px-2 py-1"
                name="team"
                value={form.team}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                {teamOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Due Date</label>
              <input
                type="date"
                className="border rounded px-2 py-1"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal;