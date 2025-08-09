import React, { useState } from "react";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Tasks", icon: "📝", path: "/tasks" },
  { label: "Team", icon: "👥", path: "/team" },
  { label: "Reports", icon: "📈", path: "/reports" },
  { label: "Settings", icon: "⚙️", path: "/settings" }
  // Removed register/logout nav item
];

import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.theme.mode);

  const handleNavClick = (item) => {
    if (item.isLogout) {
      // Add logout logic here if needed
      navigate(item.path);
    }
  };

  // Notify parent and fire custom event on collapse toggle
  const handleToggle = () => {
    const next = !collapsed;
    if (onCollapse) onCollapse(next);
    // Fire custom event for DashboardLayout
    window.dispatchEvent(new CustomEvent("sidebar:collapse", { detail: next }));
  };

  return (
    <aside
      className={`sidebar${collapsed ? " collapsed" : ""} ${
        themeMode === "dark" ? "sidebar--dark" : "sidebar--light"
      }`}
    >
      <div className="sidebar-header">
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className="app-name"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              Presence Sleep
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) =>
          item.isLogout ? (
            <div
              className="nav-item"
              key={item.label}
              onClick={() => handleNavClick(item)}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="nav-label"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to={item.path} className="nav-item" key={item.label}>
              <span className="nav-icon">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="nav-label"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        )}
      </nav>
      <div className="sidebar-profile">
        <div className="avatar">👤</div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="profile-info"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              <div className="profile-name">John Doe</div>
              <div className="profile-role">Manager</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        className="sidebar-toggle"
        onClick={handleToggle}
        aria-label="Toggle sidebar"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>
    </aside>
  );
};

export default Sidebar;