import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// SVG icons (inline for simplicity)
const SidebarIcon = () => (
  <button className="p-2 rounded hover:bg-gray-100">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
      <rect x="4" y="5" width="16" height="2" rx="1" />
      <rect x="4" y="11" width="10" height="2" rx="1" />
      <rect x="4" y="17" width="7" height="2" rx="1" />
    </svg>
  </button>
);

const GridIcon = () => (
  <button className="p-2 rounded hover:bg-gray-100">
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
      <rect x="4" y="4" width="5" height="5" rx="1" />
      <rect x="15" y="4" width="5" height="5" rx="1" />
      <rect x="4" y="15" width="5" height="5" rx="1" />
      <rect x="15" y="15" width="5" height="5" rx="1" />
    </svg>
  </button>
);

const BlueIcon = () => (
  <button className="p-2 rounded bg-blue-600 hover:bg-blue-700">
    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
      <path d="M7 17l5-5-5-5v10zm6-10v10l5-5-5-5z"/>
    </svg>
  </button>
);

const SearchIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
    <circle cx="11" cy="11" r="7"/>
    <line x1="16.5" y1="16.5" x2="21" y2="21"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white mr-2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500 mr-2">
    <polygon points="10,2 19,8 15,18 5,18 1,8"/>
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
    <path d="M18 16v-5a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z"/>
    <circle cx="12" cy="21" r="1"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 115.82 0c0 2-3 3-3 5"/>
    <circle cx="12" cy="17" r="1"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const Avatar = () => (
  <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-lg">
    AK
  </div>
);

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  const themeMenuRef = useRef(null);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem("isLoggedIn");
    navigate("/introduction");
    setShowDropdown(false);
  };

  // Close dropdown and theme menu on outside click
  useEffect(() => {
    if (!showDropdown && !showThemeMenu) return;
    function handleClickOutside(event) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!themeMenuRef.current || !themeMenuRef.current.contains(event.target))
      ) {
        setShowDropdown(false);
        setShowThemeMenu(false);
      }
      // If dropdown closes, also close theme menu
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowThemeMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown, showThemeMenu]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[200] flex items-center justify-between px-4 py-2 border-b bg-white">
      {/* Left icons */}
      <div className="flex items-center space-x-2">
        {/* <SidebarIcon /> */}
        <img
          src="https://www.veltris.com/wp-content/uploads/2025/05/Veltris.svg"
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
          />
        {localStorage.getItem("isLoggedIn") !== "true" && (
          <button
            className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="flex items-center w-full max-w-2xl bg-gray-100 rounded-full px-5 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-blue-400">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className="ml-3 w-full outline-none bg-transparent text-lg text-gray-700 placeholder-gray-400 focus:placeholder-gray-300"
            style={{ border: "none" }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-3">
        {localStorage.getItem("isLoggedIn") === "true" && (
          <>
            <button className="p-2 rounded hover:bg-gray-100 cursor-pointer"><BellIcon /></button>
            <button className="p-2 rounded hover:bg-gray-100 cursor-pointer"><QuestionIcon /></button>
            <button className="p-2 rounded hover:bg-gray-100 cursor-pointer"><SettingsIcon /></button>
            <button
              className="p-0 rounded-full focus:outline-none cursor-pointer mr-[30px]"
              onClick={() => setShowDropdown((prev) => !prev)}
              aria-label="Open user menu"
              ref={avatarRef}
            >
              <Avatar />
            </button>
            {/* Dropdown menu */}
            {showDropdown && (
              <div
                className="absolute right-4 top-20 w-80 bg-white rounded-xl shadow-2xl border z-50 animate-fade-in"
                ref={dropdownRef}
              >
                {/* Profile section */}
                <div className="flex items-center p-4 bg-gray-50 rounded-t-xl">
                  <div className="w-16 h-16 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-2xl mr-4">
                    AK
                  </div>
                  <div>
                    <div className="font-semibold text-xl text-gray-900">Abhinav Kumar</div>
                    <div className="text-gray-500 text-base">abhinavbgp@gmail.com</div>
                  </div>
                </div>
                {/* Menu items */}
                <div className="py-2">
                  <button className="flex items-center w-full px-5 py-2 hover:bg-gray-100 text-gray-800 text-lg cursor-pointer">
                    <span className="mr-4">
                      {/* Profile icon */}
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
                      </svg>
                    </span>
                    Profile
                  </button>
                  <button className="flex items-center w-full px-5 py-2 hover:bg-gray-100 text-gray-800 text-lg cursor-pointer">
                    <span className="mr-4">
                      {/* Settings icon */}
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                      </svg>
                    </span>
                    Account settings
                  </button>
                  <button
                    className="flex items-center w-full px-5 py-2 hover:bg-gray-100 text-gray-800 text-lg relative cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowThemeMenu((prev) => !prev);
                    }}
                  >
                    <span className="mr-4">
                      {/* Theme icon */}
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                    </span>
                    Theme
                    <span className="ml-auto">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="7 10 12 15 17 10"/>
                      </svg>
                    </span>
                    {/* Theme submenu placeholder */}
                    {showThemeMenu && (
                      <div
                        ref={themeMenuRef}
                        className="absolute right-full top-0 mr-2 w-72 bg-white rounded-xl shadow-2xl border z-50"
                      >
                        {/* Theme options will go here */}
                        <ThemeMenu />
                      </div>
                    )}
                  </button>
                </div>
                <div className="border-t my-1"></div>
                <div className="py-2">
                  <button className="flex items-center w-full px-5 py-2 hover:bg-gray-100 text-gray-800 text-lg cursor-pointer">
                    <span className="mr-4">
                      {/* Switch account icon */}
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
                        <path d="M16 17l3 3-3 3"/>
                      </svg>
                    </span>
                    Switch account
                  </button>
                  <button
                    className="flex items-center w-full px-5 py-2 hover:bg-gray-100 text-gray-800 text-lg cursor-pointer"
                    onClick={handleLogout}
                  >
                    <span className="mr-4">
                      {/* Logout icon */}
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7"/>
                        <path d="M3 21V3a2 2 0 012-2h6"/>
                      </svg>
                    </span>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../themeSlice";

// ThemeMenu component for submenu UI
const ThemeMenu = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  // Option data
  const options = [
    {
      key: "light",
      label: "Light",
      icon: (
        <svg width="40" height="32" className="mr-4" viewBox="0 0 40 32" fill="none">
          <rect x="2" y="2" width="36" height="28" rx="4" fill="#fff" stroke="#d1d5db" strokeWidth="2"/>
          <rect x="8" y="8" width="24" height="4" rx="2" fill="#e5e7eb"/>
          <rect x="8" y="16" width="16" height="2" rx="1" fill="#e5e7eb"/>
          <rect x="8" y="20" width="10" height="2" rx="1" fill="#e5e7eb"/>
        </svg>
      ),
    },
    {
      key: "dark",
      label: "Dark",
      icon: (
        <svg width="40" height="32" className="mr-4" viewBox="0 0 40 32" fill="none">
          <rect x="2" y="2" width="36" height="28" rx="4" fill="#18181b" stroke="#374151" strokeWidth="2"/>
          <rect x="8" y="8" width="24" height="4" rx="2" fill="#27272a"/>
          <rect x="8" y="16" width="16" height="2" rx="1" fill="#27272a"/>
          <rect x="8" y="20" width="10" height="2" rx="1" fill="#27272a"/>
        </svg>
      ),
    },
    {
      key: "system",
      label: "Match browser",
      icon: (
        <svg width="40" height="32" className="mr-4" viewBox="0 0 40 32" fill="none">
          <rect x="2" y="2" width="36" height="28" rx="4" fill="url(#half)" stroke="#d1d5db" strokeWidth="2"/>
          <defs>
            <linearGradient id="half" x1="2" y1="2" x2="38" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#18181b"/>
              <stop offset="0.5" stopColor="#18181b"/>
              <stop offset="0.5" stopColor="#fff"/>
              <stop offset="1" stopColor="#fff"/>
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="24" height="4" rx="2" fill="#e5e7eb"/>
          <rect x="8" y="16" width="16" height="2" rx="1" fill="#27272a"/>
          <rect x="8" y="20" width="10" height="2" rx="1" fill="#e5e7eb"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="py-2">
      {options.map((opt) => (
        <button
          key={opt.key}
          className={`flex items-center w-full px-4 py-3 text-lg rounded-xl mb-1 ${
            mode === opt.key ? "bg-blue-50" : "hover:bg-gray-100"
          }`}
          onClick={() => dispatch(setTheme(opt.key))}
        >
          {/* Radio */}
          <span className="mr-3 flex items-center">
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                mode === opt.key ? "border-blue-600" : "border-gray-300"
              }`}
            >
              {mode === opt.key && (
                <span className="w-3 h-3 bg-blue-600 rounded-full block"></span>
              )}
            </span>
          </span>
          {/* Icon */}
          {opt.icon}
          {/* Label */}
          <span className="font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navbar;