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
import UserPage from './pages/team/UserPage';

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
      <Routes>
        {/* Routes that do NOT show sidebar/navbar */}
        <Route
          path="/"
          element={
            <GuestOnlyRoute>
              <Introduction />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="/introduction"
          element={
            <GuestOnlyRoute>
              <Introduction />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route path="/developer" element={<DeveloperView />} />

        {/* Dashboard routes with persistent sidebar/navbar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:userId" element={<UserPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

// Add direct route for /team/user/:userId to fix routing issue
// (This is outside the AppRoutes function, so add the route above)

export default App