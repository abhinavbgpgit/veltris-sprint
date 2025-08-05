import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import AuthRedirect from "./components/AuthRedirect";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import TasksPage from "./pages/tasks/TasksPage";
import TeamPage from "./pages/team/TeamPage";
import ReportsPage from "./pages/reports/ReportsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import DeveloperView from "./pages/developer/DeveloperView";
import Introduction from "./pages/introduction/Introduction";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import React from 'react';

function App() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const applyTheme = (theme) => {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    };

    let mediaQuery;
    let handleSystemThemeChange;

    if (mode === 'system') {
      // Detect system theme
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      applyTheme(systemTheme);

      // Listen for system theme changes
      handleSystemThemeChange = (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      applyTheme(mode);
    }

    return () => {
      if (mediaQuery && handleSystemThemeChange) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      }
    };
  }, [mode]);

  return <AppRoutes />;
}

// This component must be rendered inside a Router (BrowserRouter in main.jsx)
function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect unauthenticated users to /introduction
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const allowedPaths = [
      "/login",
      "/register",
      "/forgot-password",
      "/introduction"
      
    ];
    if (
      !isLoggedIn &&
      !allowedPaths.includes(location.pathname) &&
      !location.pathname.startsWith("/introduction") 
    ) {
      navigate("/introduction", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      {/* Show Navbar only if user is logged in and on a dashboard route */}
      {(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        // List of dashboard base routes
        const dashboardRoutes = [
          "/", "/tasks", "/team", "/reports", "/settings"
        ];
        // Check if current path is a dashboard route (root or nested)
        const isDashboardRoute =
          location.pathname === "/" ||
          location.pathname.startsWith("/tasks") ||
          location.pathname.startsWith("/team") ||
          location.pathname.startsWith("/reports") ||
          location.pathname.startsWith("/settings");
        return isLoggedIn && isDashboardRoute ? <Navbar /> : null;
      })()}
      <Routes>
        <Route
          path="/"
          element={
            <GuestOnlyRoute>
              <Introduction />
            </GuestOnlyRoute>
          }
        />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/developer" element={<DeveloperView />} />
        <Route path="/login" element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        } />
        <Route
          path="/introduction"
          element={
            <GuestOnlyRoute>
              <Introduction />
            </GuestOnlyRoute>
          }
        />
        
      </Routes>
    </>
  );
}

export default App