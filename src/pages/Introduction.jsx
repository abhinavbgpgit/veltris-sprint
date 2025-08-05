
import React, { useState, useEffect } from "react";
import { 
  Layout, 
  Rocket, 
  Users, 
  BarChart3, 
  Code, 
  Shield, 
  CheckCircle, 
  Clock, 
  MessageCircle, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail 
} from "lucide-react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";

const Introduction = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated counter for stats
  const AnimatedCounter = ({ from, to, duration = 2000, suffix = "%" }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    
    useEffect(() => {
      const controls = animate(count, to, { duration: duration / 1000 });
      return () => controls.stop();
    }, [count, to, duration]);
    
    return <motion.span>{rounded}</motion.span>;
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  // Hero section floating elements
  const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: -20, opacity: 1 }}
      transition={{ 
        duration: duration, 
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className="absolute"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Veltris Flow
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['home', 'features', 'analytics', 'pricing'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-purple-400 ${
                    activeSection === item ? 'text-purple-400' : 'text-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection('pricing')}
              className="hidden md:block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-slate-700/50"
            >
              <div className="flex flex-col space-y-4">
                {['home', 'features', 'analytics', 'pricing'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-left capitalize py-2 text-slate-300 hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full font-medium self-start"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Intelligent Task</span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Management Reimagined
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Veltris Flow empowers software teams with AI-driven insights, seamless collaboration, 
              and enterprise-grade security in a beautifully intuitive interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('features')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="border border-slate-600 hover:border-purple-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-800/50"
              >
                Request Demo
              </button>
            </div>
          </motion.div>

          {/* Floating elements */}
          <div className="relative mt-16">
            <FloatingElement delay={0}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </FloatingElement>
            <FloatingElement delay={0.5}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </FloatingElement>
            <FloatingElement delay={1}>
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
            </FloatingElement>
            <FloatingElement delay={1.5}>
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
            </FloatingElement>

            {/* Main dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-2 shadow-2xl">
                <div className="bg-slate-900 rounded-xl overflow-hidden">
                  <div className="h-12 bg-gradient-to-r from-slate-800 to-slate-700 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 text-sm text-slate-400">veltris-flow-dashboard</div>
                  </div>
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="h-8 bg-slate-700 rounded w-3/4"></div>
                      <div className="space-y-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-12 bg-slate-700 rounded"></div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 bg-slate-700 rounded w-1/2"></div>
                      <div className="h-48 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-slate-600/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-2"></div>
                          <div className="h-4 bg-slate-600 rounded w-24 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 bg-slate-700 rounded w-2/3"></div>
                      <div className="space-y-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="h-16 bg-slate-700 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Purpose-Built for Development Teams
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every feature is designed with software development workflows in mind, 
              from sprint planning to deployment pipelines.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: "Role-Based Dashboards",
                description: "Custom interfaces for PMs, developers, and QA teams with the exact information each role needs.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Code,
                title: "Intelligent Task Management",
                description: "Smart assignment based on capacity, expertise, and current workload distribution.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: MessageCircle,
                title: "Real-time Collaboration",
                description: "Live updates, comment threads, and file sharing within each task context.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "SOC-2 compliant infrastructure with JWT-based authentication and role permissions.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: FileText,
                title: "Advanced Reporting",
                description: "Generate PDF/CSV reports for stakeholders with sprint velocity and burndown analysis.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Track completion rates, cycle times, and quality scores for continuous improvement.",
                color: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Data-Driven
                </span>{" "}
                Decision Making
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Transform your team's performance with actionable insights and 
                real-time analytics that help you optimize workflows and resource allocation.
              </p>
              
              <div className="space-y-6">
                {[
                  { metric: "30%", label: "Reduction in task coordination overhead" },
                  { metric: "25%", label: "Improvement in on-time delivery rates" },
                  { metric: "40%", label: "Faster onboarding for new team members" },
                  { metric: "50%", label: "Less time spent on status reporting" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AnimatedCounter from={0} to={parseInt(item.metric)} suffix="%" />
                    </div>
                    <span className="text-slate-300">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50"
            >
              {/* Mock analytics chart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Sprint Velocity</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4">
                  <div className="h-full flex items-end space-x-2">
                    {[20, 45, 30, 60, 50, 75, 65].map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ 
                          duration: 0.8, 
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        className={`${
                          index === 5 ? 'bg-gradient-to-t from-purple-500 to-pink-500' : 'bg-gradient-to-t from-blue-500 to-cyan-500'
                        } rounded-t-lg flex-1`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Sprint 1</span>
                  <span>Sprint 7</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the plan that fits your team's needs. All plans include enterprise-grade security and 24/7 support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$15",
                period: "/user/month",
                description: "Perfect for small teams just getting started",
                features: [
                  "Up to 10 users",
                  "Basic task management",
                  "Kanban boards",
                  "File attachments",
                  "Email support"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$29",
                period: "/user/month",
                description: "Everything you need for growing development teams",
                features: [
                  "Unlimited users",
                  "Advanced analytics",
                  "Performance tracking",
                  "Priority support",
                  "API access",
                  "Custom reporting"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "/deployment",
                description: "Tailored solution for large organizations",
                features: [
                  "All Professional features",
                  "SSO & SAML integration",
                  "Dedicated account manager",
                  "On-premise deployment",
                  "Custom SLAs",
                  "Advanced security audits"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 transition-all duration-300 hover:border-slate-600/50 ${
                  plan.popular ? 'ring-2 ring-purple-500/50 transform md:scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Veltris Flow</span>
              </div>
              <p className="text-slate-400 mb-4">
                Enterprise-grade task management and team collaboration for software development teams.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Mail, href: "#" }
                ].map((social, index) => (
                  <a key={index} href={social.href} className="text-slate-400 hover:text-purple-400 transition-colors">
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                {['Features', 'Analytics', 'Integrations', 'Roadmap', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                {['Documentation', 'Guides', 'API Reference', 'Community', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                {['About', 'Careers', 'Pricing', 'Contact', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Veltris Flow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Introduction

