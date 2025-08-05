import React from "react";

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length === 0) return { score: 0, label: "", color: "#eee" };
  if (score <= 1) return { score, label: "Weak", color: "#e74c3c" };
  if (score === 2) return { score, label: "Medium", color: "#f1c40f" };
  return { score, label: "Strong", color: "#2ecc71" };
}

const PasswordStrengthBar = ({ password }) => {
  const { score, label, color } = getStrength(password);
  return (
    <div style={{ margin: "4px 0 8px 0" }}>
      <div style={{
        height: 8,
        width: "100%",
        background: "#eee",
        borderRadius: 4,
        overflow: "hidden"
      }}>
        <div style={{
          width: `${(score / 3) * 100}%`,
          height: "100%",
          background: color,
          transition: "width 0.3s"
        }} />
      </div>
      {label && (
        <div style={{ fontSize: 12, color, marginTop: 2 }}>
          {label}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthBar;