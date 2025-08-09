import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Briefcase, GraduationCap, Code, User, Target } from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose, user }) => {
  const baseProfileData = {
    name: "Abhinav Kumar",
    email: "abhinavbgp@gmail.com",
    phone: "+91-9570452922",
    location: "Bhagalpur, India",
    objective:
      "Seeking challenging assignments in the development field. Hoping to share my skills, expertise, and experience with team and valuable clients.",
    professionalSummary: [
      "4+ years’ experience as UI developer.",
      "Experienced in JavaScript, React.js, and Next.js.",
      "Proficient in HTML5, CSS3, SCSS, Tailwind, jQuery, ES6.",
      "Hands-on with React hooks, Unit testing, CSS animation, Framer-Motion.",
      "Knowledge of Agile, Jira, Docker, Material UI."
    ],
    technicalSkills: {
      frontEnd: "React Js, HTML5, CSS3, jQuery, JavaScript, ES6, SASS, Redux",
      backEnd: "Node.js, Express, MongoDB",
      middleware: "Saga, Thunk, Redux Toolkit",
      other: "Material UI, Git, Docker, AWS",
      testing: "Jest, React Testing Library, Enzyme"
    },
    experience: [
      {
        company: "Bhagalpur Engineering College",
        duration: "2008 - 2021",
        role: "Teacher",
        description:
          "Taught computer science courses (Graphics, C, C++, JavaScript, HTML, CSS, React, Node.js) and guided students for campus selections."
      },
      {
        company: "Agastya (EdTech Project)",
        duration: "2021 - 2022",
        role: "Frontend Developer | React.js, Redux Toolkit, Tailwind CSS, TypeScript",
        responsibilities: [
          "Created reusable UI components",
          "Fetched & displayed API data",
          "Added packages as per requirement",
          "Wrote unit tests"
        ]
      },
      {
        company: "ExaThought Technology Consulting (Ecommerce Project)",
        duration: "2022 - Present",
        role: "Frontend Developer | React.js, Redux, Thunk, Material UI, SCSS",
        responsibilities: [
          "Developed UI for browsing, cart, and transactions",
          "Integrated authentication, payment gateway",
          "Focused on scalability and engaging UX"
        ]
      }
    ],
    education:
      "B.E in Computer Science - Vidhya Vardhka College of Engineering, VTU University, Karnataka (2008, 58%)"
  };

  const profileData = useMemo(() => {
    return {
      ...baseProfileData,
      name: user?.name ?? baseProfileData.name,
      email: user?.email ?? baseProfileData.email,
      location: user?.location ?? baseProfileData.location,
      role: user?.role ?? "Senior Frontend Developer",
      phone: user?.phone ?? baseProfileData.phone
    };
  }, [user]);

  const [activeTab, setActiveTab] = useState('overview');

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  if (!isOpen) return null;

  const initials = profileData.name.split(' ').map(n => n[0]).join('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-profile-title"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-8 text-white flex-shrink-0">
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-2xl font-bold text-blue-600">
                      {initials}
                    </span>
                  </motion.div>
                  <div>
                    <h1 id="user-profile-title" className="text-3xl font-bold mb-2">
                      {profileData.name}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {profileData.role}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                  aria-label="Close profile modal"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="px-8 py-4 bg-gray-50 border-b flex-shrink-0">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">{profileData.location}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="px-8 py-4 border-b flex-shrink-0">
              <div className="flex space-x-8">
                {['overview', 'experience', 'skills', 'education'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 px-1 capitalize font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="flex-1 overflow-y-auto">
              <div className="px-8 py-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="bg-blue-50 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <Target className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="text-xl font-semibold text-gray-800">Career Objective</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{profileData.objective}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <User className="w-5 h-5 text-blue-600 mr-2" />
                          Professional Summary
                        </h3>
                        <div className="grid gap-3">
                          {profileData.professionalSummary.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-3 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                            >
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <p className="text-gray-700">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'experience' && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 pb-4"
                    >
                      <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
                        Work Experience
                      </h3>
                      <div className="space-y-6">
                        {profileData.experience.map((exp, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex flex-wrap items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold text-gray-800">{exp.company}</h4>
                              <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                {exp.duration}
                              </span>
                            </div>
                            <p className="text-blue-600 font-medium mb-3">{exp.role}</p>
                            {exp.description && <p className="text-gray-700 mb-4">{exp.description}</p>}
                            {exp.responsibilities && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">Key Responsibilities:</h5>
                                <ul className="space-y-1">
                                  {exp.responsibilities.map((resp, respIndex) => (
                                    <li key={respIndex} className="flex items-start space-x-2 text-gray-700">
                                      <span className="text-blue-500 mt-1">•</span>
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 pb-4"
                    >
                      <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <Code className="w-6 h-6 text-blue-600 mr-2" />
                        Technical Skills
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(profileData.technicalSkills).map(([category, skills], index) => (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 border hover:shadow-md transition-shadow"
                          >
                            <h4 className="font-semibold text-gray-800 mb-3 capitalize">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className="text-gray-700">{skills}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'education' && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 pb-4"
                    >
                      <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                        <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                        Education
                      </h3>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 border-l-4 border-purple-600"
                      >
                        <p className="text-gray-700 leading-relaxed">{profileData.education}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.div variants={itemVariants} className="px-8 py-6 bg-gray-50 border-t text-center flex-shrink-0">
              <p className="text-gray-600">
                Ready to collaborate on exciting projects. Let's build something amazing together!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileModal;