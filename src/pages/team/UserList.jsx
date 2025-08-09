
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, User, Mail, BadgeCheck } from "lucide-react";

import { useNavigate } from "react-router-dom";
import AnimatedButton from "../../components/AnimatedButton";
import AnimatedOutlineButton from "../../components/AnimatedOutlineButton";
import UserProfileModal from "./UserProfileModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ALL");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // For delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // For edit (placeholder, no action)
  const handleEdit = (user) => {
    // Implement edit logic or open edit modal
    alert(`Edit user: ${user.name}`);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  // Confirm deletion with API call
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userToDelete._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
    } catch (err) {
      alert("Error deleting user: " + err.message);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Profile modal handlers
  const openProfile = (user) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };
  const closeProfile = () => {
    setShowProfileModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        // Fallback demo data
        setUsers([
          { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Developer" },
          { id: 2, name: "Sam Rivera", email: "sam@example.com", role: "QA Engineer" },
          { id: 3, name: "Taylor Kim", email: "taylor@example.com", role: "Designer" },
          { id: 4, name: "Jordan Smith", email: "jordan@example.com", role: "Manager" },
          { id: 5, name: "Casey Brown", email: "casey@example.com", role: "Developer" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Extract initials: First letter of first and last name
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0]?.toUpperCase() || "?";
    const last = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : first;
    return `${first}${last}`;
  };

  // Tabs config and filtering
  const tabs = [
    { key: "ALL", label: "All" },
    { key: "FE", label: "Frontend" },
    { key: "BE", label: "Backend" },
    { key: "QA", label: "QA" },
  ];

  const normalizeRole = (roleRaw = "") => {
    const r = String(roleRaw).toLowerCase();
    if (r === "fe" || r.includes("front")) return "FE";
    if (r === "be" || r.includes("back")) return "BE";
    if (r === "qa" || r.includes("quality")) return "QA";
    return "OTHER";
  };

  const filteredUsers = React.useMemo(() => {
    if (activeTab === "ALL") return users;
    return users.filter((u) => normalizeRole(u.role) === activeTab);
  }, [users, activeTab]);

  return (
    <>
    

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Team Members</h3>
        <span className="text-sm text-gray-500">{filteredUsers.length} members</span>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex flex-wrap gap-2" aria-label="User filters">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors duration-200 ${
                activeTab === t.key
                  ? "bg-white text-blue-600 border border-gray-200 border-b-white -mb-px"
                  : "text-gray-600 hover:text-gray-800 border border-transparent hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
     

      {/* Scrollable Container with 30vh height */}
      <div
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ minHeight: "30vh" }}
      >
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="ml-2 text-gray-600">Loading users...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-sm w-full">Failed to load users.</div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-sm w-full">No users found.</p>
        ) : (
          filteredUsers.map((user) => {
            const initials = getInitials(user.name);
            return (
              <div
                key={user.id || user.email}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0"
                style={{ width: "320px" }}
                // onClick={() => navigate(`/team/${user._id}`)}
                role="button"
                tabIndex={0}
              >
                <motion.div
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                  }}
                  className="group relative bg-white border border-gray-200 hover:border-blue-300 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-default flex flex-col h-full"
                >
                  {/* Header with gradient and initials */}
                  <div className="relative">
                    <div 
                      className="h-20 bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{
                        background: `linear-gradient(135deg, ${getGradientColor(user.name)})`,
                      }}
                    ></div>
                    <div className="absolute -bottom-8 left-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{
                            background: `linear-gradient(135deg, ${getGradientColor(user.name)})`,
                          }}
                        >
                          {initials}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute top-3 right-3 flex gap-1">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="pt-10 px-4 pb-4 flex-1">
                    <div className="mb-3">
                      <h4 className="font-bold text-gray-900 text-lg truncate flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {user.name}
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{user.email}</span>                       
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                        <BadgeCheck className="w-3 h-3" />
                        {user.role}
                      </span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div >
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <AnimatedOutlineButton
                          className="w-full px-6 py-3 text-base"
                          onClick={() => openProfile(user)}
                        >
                          View Profile
                        </AnimatedOutlineButton>
                      </div>
                      <div className="flex-1">
                        <AnimatedButton
                          className="w-full px-6 py-3 text-base"
                          onClick={() => navigate(`/team/${user._id || user.id}`)}
                        >
                          View Tasks
                        </AnimatedButton>
                      </div>
                    </div>
                   
                      </div>
                  
                </motion.div>
                
              </div>
            );
          })
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border border-red-100 relative"
          >
            {/* Danger Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Delete User?</h3>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-gray-900">{userToDelete.name}</span>? This action cannot be undone.
            </p>
            
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelDelete}
                className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-md hover:shadow-lg"
              >
                Delete
              </button>
            </div>
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={cancelDelete}
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </div>
    <UserProfileModal
      isOpen={showProfileModal}
      onClose={closeProfile}
      user={selectedUser}
    />
        </>
  );
};

// Generate consistent gradient based on name
const getGradientColor = (name) => {
  const gradients = [
    "#3b82f6, #8b5cf6", // blue to purple
    "#ec4899, #f43f5e", // pink to rose
    "#10b981, #06b6d4", // emerald to cyan
    "#f59e0b, #ef4444", // amber to red
    "#8b5cf6, #ec4899", // violet to pink
    "#06b6d4, #3b82f6", // cyan to blue
    "#f97316, #ef4444", // orange to red
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }
  return gradients[hash % gradients.length];
};

export default UserList;