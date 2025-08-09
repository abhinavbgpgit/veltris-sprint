import React, { useState } from "react";

const initialForm = {
  name: "",
  role: "",
  team: "",
  email: "",
  status: "Active",
};

const AddMember = ({ onAdd, onClose }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.team || !form.email) return;
    onAdd({ ...form, workload: 0, taskCount: { active: 0, total: 0 }, metrics: {} });
    setForm(initialForm);
    if (onClose) onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "#f9fafb",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        maxWidth: 400,
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Add New Member</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ddd" }}
      />
      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
        style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ddd" }}
      />
      <input
        name="team"
        placeholder="Team (e.g. FE, BE, QA)"
        value={form.team}
        onChange={handleChange}
        required
        style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ddd" }}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ddd" }}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={{ padding: "0.7rem", borderRadius: "6px", border: "1px solid #ddd" }}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: "6px",
              padding: "0.6rem 1.2rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Member
        </button>
      </div>
    </form>
  );
};

export default AddMember;