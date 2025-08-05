import React from "react";
import TeamMemberCard from "../../components/TeamMemberCard";

const sampleMember = {
  name: "Priya Sharma",
  role: "Frontend Developer",
  team: "FE",
  email: "priya.sharma@example.com",
  status: "Active",
  workload: 72,
  taskCount: { active: 4, total: 12 },
  metrics: {
    completionRate: 92,
    avgTaskTime: "3d 4h",
    onTimeDelivery: 95,
    qualityScore: 9,
    collaborationScore: 8
  },
  onEdit: () => alert("Edit member"),
  onDelete: () => alert("Delete member")
};

const TeamPage = () => (
  <main className="team-page-container" style={{
    // maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    minHeight: "80vh",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
  }}>
    {/* Page header, controls, and overview will be added here */}
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1.5rem"
    }}>
      <h1 style={{
        fontSize: "2.2rem",
        fontWeight: 700,
        margin: 0,
        letterSpacing: "-1px"
      }}>Team</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
          }}
        >
          + Add Member
        </button>
        <select
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
            fontSize: "1rem",
            background: "#f9fafb",
            color: "#222"
          }}
          defaultValue="card"
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
          <option value="workload">Workload View</option>
        </select>
      </div>
    </header>
    {/* Team overview section */}
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr 2fr 1fr",
        gap: "1.5rem",
        alignItems: "stretch",
        background: "#f3f4f6",
        borderRadius: "10px",
        padding: "2rem 1.5rem",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        marginTop: "1rem"
      }}
    >
      {/* Total Members */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span style={{ fontSize: "2.5rem", fontWeight: 700, color: "#2563eb" }}>12</span>
        <span style={{ fontSize: "1.1rem", color: "#555" }}>Total Members</span>
      </div>
      {/* Team Distribution Chart Placeholder */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "conic-gradient(#2563eb 0% 40%, #10b981 40% 75%, #f59e42 75% 100%)",
          marginBottom: "0.5rem"
        }}></div>
        <span style={{ fontSize: "1.1rem", color: "#555" }}>FE/BE/QA</span>
        <div style={{ fontSize: "0.95rem", color: "#888" }}>
          <span style={{ color: "#2563eb" }}>5 FE</span> | <span style={{ color: "#10b981" }}>4 BE</span> | <span style={{ color: "#f59e42" }}>3 QA</span>
        </div>
      </div>
      {/* Average Workload */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#10b981" }}>68%</span>
        <span style={{ fontSize: "1.1rem", color: "#555" }}>Avg. Workload</span>
      </div>
      {/* Team Performance Metrics Placeholder */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span style={{ fontSize: "1.1rem", color: "#555" }}>Performance</span>
        <div style={{ fontSize: "0.95rem", color: "#888" }}>
          <span>Tasks Done: <b>34</b></span><br />
          <span>On Time: <b>91%</b></span>
        </div>
      </div>
      {/* Export/Print Buttons */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "0.5rem"
      }}>
        <button style={{
          background: "#fff",
          color: "#2563eb",
          border: "1px solid #2563eb",
          borderRadius: "6px",
          padding: "0.4rem 1rem",
          fontWeight: 600,
          fontSize: "0.98rem",
          cursor: "pointer",
          marginBottom: "0.3rem"
        }}>
          Export
        </button>
        <button style={{
          background: "#fff",
          color: "#222",
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          padding: "0.4rem 1rem",
          fontWeight: 600,
          fontSize: "0.98rem",
          cursor: "pointer"
        }}>
          Print
        </button>
      </div>
    </section>
    {/* Team member cards */}
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        marginTop: "2rem",
        justifyContent: "flex-start"
      }}
    >
      <TeamMemberCard {...sampleMember} />
      {/* Add more <TeamMemberCard /> here for additional members */}
    </section>
  </main>
);

export default TeamPage;