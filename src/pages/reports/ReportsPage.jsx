import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const ReportsPage = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reportType, setReportType] = useState("sprint");
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simulate loading
  };

  // Mock report data for export
  const reportData = [
    { label: "Report Type", value: reportType },
    { label: "From", value: dateFrom || "N/A" },
    { label: "To", value: dateTo || "N/A" },
    { label: "Generated At", value: new Date().toLocaleString() }
  ];

  // Export as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Sprint Report", 10, 10);
    let y = 20;
    reportData.forEach(item => {
      doc.setFontSize(12);
      doc.text(`${item.label}: ${item.value}`, 10, y);
      y += 8;
    });
    doc.save("report.pdf");
  };

  // Export as CSV
  const handleExportCSV = () => {
    const csvRows = [
      ["Field", "Value"],
      ...reportData.map(item => [item.label, item.value])
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export as Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "report.xlsx");
  };

  // --- Mock data for charts ---
  const sprintVelocityData = [
    { sprint: "Sprint 1", velocity: 30 },
    { sprint: "Sprint 2", velocity: 35 },
    { sprint: "Sprint 3", velocity: 28 },
    { sprint: "Sprint 4", velocity: 40 },
    { sprint: "Sprint 5", velocity: 38 }
  ];

  const burndownData = [
    { day: "Day 1", remaining: 100 },
    { day: "Day 2", remaining: 80 },
    { day: "Day 3", remaining: 60 },
    { day: "Day 4", remaining: 40 },
    { day: "Day 5", remaining: 20 },
    { day: "Day 6", remaining: 0 }
  ];

  const teamPerformanceData = [
    { name: "Team A", completed: 40 },
    { name: "Team B", completed: 35 },
    { name: "Team C", completed: 28 },
    { name: "Team D", completed: 32 }
  ];

  const taskDistributionData = [
    { name: "Feature", value: 50 },
    { name: "Bug", value: 20 },
    { name: "Chore", value: 15 },
    { name: "Improvement", value: 15 }
  ];

  const pieColors = ["#1e40af", "#0ea5e9", "#f59e42", "#e11d48"];

  return (
    <div className="reports-container min-h-screen bg-white dark:bg-gray-900 px-4 py-8 md:px-12 lg:px-24 veltris-bg">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-veltris-blue tracking-tight mb-2">
          Reports
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Analyze team performance, sprint progress, and key metrics.
        </p>
      </div>
      {/* Selectors */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        {/* Date range selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="date-from" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            From
          </label>
          <input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-veltris-blue bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="date-to" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            To
          </label>
          <input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-veltris-blue bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        {/* Report type selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="report-type" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Report Type
          </label>
          <select
            id="report-type"
            value={reportType}
            onChange={e => setReportType(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-veltris-blue bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="sprint">Sprint Report</option>
            <option value="team">Team Performance</option>
            <option value="task">Task Analysis</option>
          </select>
        </div>
      </div>
      {/* Report Generation Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        {/* Generate Report button */}
        <button
          onClick={handleGenerateReport}
          disabled={loading}
          className="bg-veltris-blue hover:bg-veltris-blue-dark text-white font-semibold px-6 py-2 rounded shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Report"
          )}
        </button>
        {/* Export options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-300">Export:</span>
          <button
            onClick={handleExportPDF}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-veltris-blue font-medium px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-veltris-blue font-medium px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-veltris-blue font-medium px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Excel
          </button>
        </div>
      </div>
      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sprint velocity chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-veltris-blue mb-2">Sprint Velocity</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sprintVelocityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sprint" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="velocity" fill="#1e40af" name="Velocity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Burndown chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-veltris-blue mb-2">Burndown Chart</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="remaining" stroke="#e11d48" name="Remaining Tasks" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Team performance comparison chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-veltris-blue mb-2">Team Performance Comparison</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#0ea5e9" name="Completed Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Task distribution pie chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-veltris-blue mb-2">Task Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={taskDistributionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {taskDistributionData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Key Metrics Section */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Completion rate metric */}
        {/* Average cycle time metric */}
        {/* Team velocity metric */}
        {/* Bug rate metric */}
      </div>
    </div>
  );
};

export default ReportsPage;