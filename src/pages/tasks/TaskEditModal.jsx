import React, { useState, useEffect, useRef } from "react";

const mockActivityLog = [
  { id: 1, user: "John", action: "Changed status to In Progress", timestamp: "2025-08-01 10:00" },
  { id: 2, user: "Sarah", action: "Added attachment: spec.pdf", timestamp: "2025-08-02 14:30" },
  { id: 3, user: "Mike", action: "Commented: Please review", timestamp: "2025-08-03 09:15" },
];

const TaskEditModal = ({ isOpen, onClose, task }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignee: "",
    dueDate: "",
    tags: "",
  });
  const [activityLog, setActivityLog] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "",
        priority: task.priority || "",
        assignee: task.assignee || "",
        dueDate: task.dueDate || "",
        tags: (task.tags && task.tags.join(", ")) || "",
      });
      setActivityLog(mockActivityLog);
      setAttachments(task.attachments || []);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttachmentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      id: Date.now() + Math.random(),
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
    setActivityLog((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "CurrentUser",
        action: `Added attachment: ${files.map((f) => f.name).join(", ")}`,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAttachmentDelete = (id, name) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
    setActivityLog((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "CurrentUser",
        action: `Deleted attachment: ${name}`,
        timestamp: new Date().toLocaleString(),
      },
    ]);
  };

  const handleSave = () => {
    // Here you would call a save handler or API
    setActivityLog((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "CurrentUser",
        action: "Saved changes",
        timestamp: new Date().toLocaleString(),
      },
    ]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Task: {form.title}</h2>
        <form className="space-y-3 mb-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div>
            <label className="block font-semibold">Title</label>
            <input className="input input-bordered w-full" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea className="input input-bordered w-full" name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-semibold">Status</label>
              <select className="input input-bordered w-full" name="status" value={form.status} onChange={handleChange}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>In Review</option>
                <option>Done</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-semibold">Priority</label>
              <select className="input input-bordered w-full" name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block font-semibold">Assignee</label>
              <input className="input input-bordered w-full" name="assignee" value={form.assignee} onChange={handleChange} />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">Due Date</label>
              <input className="input input-bordered w-full" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Tags (comma separated)</label>
            <input className="input input-bordered w-full" name="tags" value={form.tags} onChange={handleChange} />
          </div>
        </form>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Attachments</h3>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="mb-2"
            onChange={handleAttachmentUpload}
          />
          <ul className="mb-2">
            {attachments.map((a) => (
              <li key={a.id} className="flex items-center justify-between border-b py-1">
                <span>{a.name}</span>
                <button
                  className="btn btn-xs btn-danger"
                  onClick={() => handleAttachmentDelete(a.id, a.name)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
            {attachments.length === 0 && <li className="text-gray-400">No attachments</li>}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Activity Log</h3>
          <ul className="max-h-32 overflow-y-auto text-sm">
            {activityLog.map((log) => (
              <li key={log.id} className="mb-1">
                <span className="font-semibold">{log.user}</span>: {log.action} <span className="text-gray-400">({log.timestamp})</span>
              </li>
            ))}
            {activityLog.length === 0 && <li className="text-gray-400">No activity yet</li>}
          </ul>
        </div>
        <div className="flex justify-between">
          <button className="btn btn-danger" type="button">Delete Task</button>
          <div className="flex gap-2">
            <button className="btn btn-secondary" onClick={onClose} type="button">Cancel</button>
            <button className="btn btn-primary" onClick={handleSave} type="button">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;