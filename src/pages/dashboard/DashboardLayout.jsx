import React from "react";
import "./DashboardLayout.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  // Sidebar collapsed state is managed in Sidebar, but we need to know it here for margin
  // We'll use a custom event for demo; in a real app, use context or redux
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for custom event from Sidebar
  React.useEffect(() => {
    const handler = (e) => setSidebarCollapsed(e.detail);
    window.addEventListener("sidebar:collapse", handler);
    return () => window.removeEventListener("sidebar:collapse", handler);
  }, []);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <AnimatePresence>
        <motion.div
          key={sidebarCollapsed ? "collapsed" : "expanded"}
          initial={{ width: sidebarCollapsed ? 60 : 250 }}
          animate={{ width: sidebarCollapsed ? 60 : 250 }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3, type: "tween" }}
          className="sidebar-motion"
        >
          <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
        </motion.div>
      </AnimatePresence>
      <main
        className={`main-content${sidebarCollapsed ? " collapsed" : ""}`}
        style={{
          marginLeft: sidebarCollapsed ? 60 : 250,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;