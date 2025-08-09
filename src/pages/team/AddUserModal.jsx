import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "FE",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const MAX_PDF_MB = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPdfError("");
    const file = e.target.files?.[0];
    if (!file) {
      setPdfFile(null);
      return;
    }
    const isPdfType = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdfType) {
      setPdfFile(null);
      setPdfError("Only PDF files are allowed.");
      return;
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      setPdfFile(null);
      setPdfError(`File too large. Max ${MAX_PDF_MB} MB.`);
      return;
    }
    setPdfFile(file);
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setPdfError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (pdfError) {
        throw new Error(pdfError);
      }

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("role", formData.role);
      if (pdfFile) {
        // Field name "pdf" - adjust to your backend expectation if needed
        payload.append("pdf", pdfFile);
      }

      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        body: payload, // Let the browser set the multipart/form-data boundary
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess(`User "${formData.name}" added successfully!`);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "FE",
      });
      setPdfFile(null);
      setPdfError("");

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
              <h3 className="text-2xl font-semibold text-white">Add New User</h3>
              <p className="text-blue-100 text-sm mt-1">Fill in the details to create a developer account.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
                  {success}
                </div>
              )}
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Alex Johnson"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>

              {/* Role */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  disabled={loading}
                >
                  <option value="FE">Frontend Developer</option>
                  <option value="BE">Backend Developer</option>
                  <option value="QA">Qauility Analist</option>
                </select>
              </div>

              {/* PDF Attachment */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Attach PDF (optional)</label>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {pdfFile && (
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <span className="truncate mr-3">
                      {pdfFile.name} • {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-red-600 hover:text-red-700 font-medium"
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                )}
                {pdfError && (
                  <div className="text-red-600 text-sm">{pdfError}</div>
                )}
                <p className="text-xs text-gray-500">Only PDF files up to {MAX_PDF_MB} MB are allowed.</p>
              </div>
 
              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;