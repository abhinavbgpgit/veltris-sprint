import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import AuthRedirect from "./components/AuthRedirect";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import TasksPage from "./pages/tasks/TasksPage";
import TeamPage from "./pages/team/TeamPage";
import ReportsPage from "./pages/reports/ReportsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import DeveloperView from "./pages/developer/DeveloperView";

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

  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
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
      </Routes>
    </>
  );
}

export default App