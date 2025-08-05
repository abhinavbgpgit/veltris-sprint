import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../themeSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div>
      <h1>Settings</h1>
      <p>User preferences, notification settings, system configuration, and API key management will appear here.</p>
    </div>
  );
};

export default SettingsPage;