import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, Mail, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getInitials = (name) => {
  if (!name) return "??";
  const parts = String(name).trim().split(/\s+/);
  const first = parts[0]?.[0]?.toUpperCase() || "?";
  const last = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : first;
  return `${first}${last}`;
};

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
  const basis = String(name || "User");
  let hash = 0;
  for (let i = 0; i < basis.length; i++) hash += basis.charCodeAt(i);
  return gradients[hash % gradients.length];
};

const UserProfileModal = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();

  if (!isOpen || !user) return null;

  const initials = getInitials(user.name || user.fullName || "User");
  const headerGradient = `linear-gradient(135deg, ${getGradientColor(user.name || "User")})`;
  const userId = user?._id ?? user?.id;

  const handleOpenFullProfile = () => {
    if (!userId) return;
    navigate(`/team/${userId}`);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient and avatar */}
            <div className="relative h-24" style={{ background: headerGradient }} />

            <div className="px-6 pb-6 -mt-10">
              <div className="flex items-end justify-between">
                <div className="flex items-end gap-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ background: headerGradient }}
                    >
                      {initials}
                    </div>
                  </div>
                  <div className="pb-2">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <UserIcon className="w-5 h-5 text-gray-400" />
                      {user.name || "Unnamed User"}
                    </h3>
                    <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{user.email || "No email"}</span>
                    </div>
                  </div>
                </div>

                <button
                  aria-label="Close"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition mr-1 mt-1"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</div>
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                    <BadgeCheck className="w-4 h-4" />
                    {user.role || "N/A"}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    Active
                  </div>
                </div>

                {/* Optional fields if available */}
                {user.team && (
                  <div className="p-4 rounded-xl border border-gray-200 md:col-span-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</div>
                    <div className="mt-2 text-sm text-gray-800">{user.team}</div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-200"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleOpenFullProfile}
                  disabled={!userId}
                  className={`flex-1 py-3 font-medium rounded-xl transition-all duration-200 text-white shadow-md hover:shadow-lg ${
                    userId ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
                  }`}
                >
                  Open Full Profile
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileModal;