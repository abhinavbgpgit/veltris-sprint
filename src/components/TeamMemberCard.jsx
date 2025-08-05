import React from "react";

/**
 * TeamMemberCard component displays detailed information about a team member.
 * Props:
 * - name: string
 * - role: string
 * - team: string
 * - email: string
 * - status: "Active" | "Inactive"
 * - workload: number (0-100)
 * - taskCount: { active: number, total: number }
 * - metrics: {
 *     completionRate: number,
 *     avgTaskTime: string,
 *     onTimeDelivery: number,
 *     qualityScore: number,
 *     collaborationScore: number
 *   }
 * - onEdit: function
 * - onDelete: function
 */
const TeamMemberCard = ({
  name,
  role,
  team,
  email,
  status,
  workload,
  taskCount,
  metrics,
  onEdit,
  onDelete,
}) => {
  // Placeholder for avatar initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase();
  };

  return (
    <div className="team-member-card" style={{
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "20px",
      background: "#fff",
      maxWidth: "350px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      margin: "16px auto"
    }}>
      {/* Avatar with initials */}
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "#1976d2", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, fontWeight: 700, marginBottom: 12
      }}>
        {getInitials(name)}
      </div>
      {/* Name and role */}
      <div style={{ fontWeight: 600, fontSize: 18 }}>{name}</div>
      <div style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>{role}</div>
      {/* Team assignment */}
      <div style={{ fontSize: 13, marginBottom: 8 }}>
        <b>Team:</b> {team}
      </div>
      {/* Email (clickable) */}
      <div style={{ fontSize: 13, marginBottom: 8 }}>
        <a href={`mailto:${email}`} style={{ color: "#1976d2", textDecoration: "underline" }}>{email}</a>
      </div>
      {/* Status indicator */}
      <div style={{ marginBottom: 8 }}>
        <span style={{
          display: "inline-block",
          width: 10, height: 10, borderRadius: "50%",
          background: status === "Active" ? "#4caf50" : "#bdbdbd",
          marginRight: 6
        }} />
        <span style={{ fontSize: 13 }}>{status}</span>
      </div>
      {/* Workload progress bar */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, marginBottom: 2 }}>Workload</div>
        <div style={{
          background: "#f0f0f0", borderRadius: 6, height: 8, width: "100%"
        }}>
          <div style={{
            width: `${workload}%`,
            background: workload > 80 ? "#e53935" : "#1976d2",
            height: 8, borderRadius: 6
          }} />
        </div>
        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{workload}%</div>
      </div>
      {/* Task count */}
      <div style={{ fontSize: 13, marginBottom: 8 }}>
        <b>Tasks:</b> {taskCount.active} active / {taskCount.total} total
      </div>
      {/* Performance metrics */}
      <div style={{
        background: "#f9f9f9", borderRadius: 8, padding: "10px 12px", marginBottom: 10
      }}>
        <div style={{ fontSize: 13, marginBottom: 2 }}>
          <b>Completion Rate:</b> {metrics.completionRate}%
        </div>
        <div style={{ fontSize: 13, marginBottom: 2 }}>
          <b>Avg Task Time:</b> {metrics.avgTaskTime}
        </div>
        <div style={{ fontSize: 13, marginBottom: 2 }}>
          <b>On-time Delivery:</b> {metrics.onTimeDelivery}%
        </div>
        <div style={{ fontSize: 13, marginBottom: 2 }}>
          <b>Quality Score:</b> {metrics.qualityScore}/10
        </div>
        <div style={{ fontSize: 13 }}>
          <b>Collaboration:</b> {metrics.collaborationScore}/10
        </div>
      </div>
      {/* Edit/Delete buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onEdit}
          style={{
            flex: 1,
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 0",
            cursor: "pointer"
          }}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          style={{
            flex: 1,
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "6px 0",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TeamMemberCard;