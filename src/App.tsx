import React, { useState, useRef } from "react";
import { Task, TaskFormData } from "./types";
import TaskForm from "./components/TaskForm";
import TaskGrid from "./components/TaskGrid";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const idCounter = useRef<number>(1);

  const handleAdd = (formData: TaskFormData): void => {
    const newTask: Task = { ...formData, id: idCounter.current++ };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdate = (updated: Task): void => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (id: number): void => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f5f3ff 0%, #eff6ff 50%, #f0f9ff 100%)",
        padding: "28px 20px 48px",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: 1340, margin: "0 auto" }}>
        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <line x1="8" y1="14" x2="8.01" y2="14"/>
                <line x1="12" y1="14" x2="12.01" y2="14"/>
                <line x1="16" y1="14" x2="16.01" y2="14"/>
              </svg>
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.5px",
                }}
              >
                Azure DevOps Task Tracker
              </h1>
              <p style={{ margin: 0, fontSize: 12.5, color: "#7a869a", marginTop: 2 }}>
                Track, manage, and export your development tasks
              </p>
            </div>
          </div>

          {/* Stats bar */}
          {tasks.length > 0 && (
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {[
                { label: "Total", count: tasks.length, color: "#6366f1", bg: "#ede9fe" },
                { label: "Analysis", count: tasks.filter(t => t.status === "Analysis").length, color: "#0891b2", bg: "#dbeafe" },
                { label: "Dev In Progress", count: tasks.filter(t => t.status === "Dev In Progress").length, color: "#d97706", bg: "#fef3c7" },
                { label: "Dev Complete", count: tasks.filter(t => t.status === "Dev Complete").length, color: "#059669", bg: "#d1fae5" },
                { label: "PR Raised", count: tasks.filter(t => t.status === "PR Raised").length, color: "#7c3aed", bg: "#e9d5ff" },
                { label: "PR Approved", count: tasks.filter(t => t.status === "PR Approved").length, color: "#06b6d4", bg: "#d0fde4" },
                { label: "PR Merged", count: tasks.filter(t => t.status === "PR Merged").length, color: "#4338ca", bg: "#e0e7ff" },
                { label: "QA In Progress", count: tasks.filter(t => t.status === "QA In Progress").length, color: "#ea580c", bg: "#fef3c7" },
                { label: "QA Complete", count: tasks.filter(t => t.status === "QA Complete").length, color: "#84cc16", bg: "#dcfce7" },
                { label: "Done", count: tasks.filter(t => t.status === "Done").length, color: "#059669", bg: "#d1fae5" },
              ].map(({ label, count, color, bg }) => (
                <div key={label} style={{ background: bg, borderRadius: 8, padding: "5px 14px", display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color }}>{count}</span>
                  <span style={{ fontSize: 11.5, fontWeight: 600, color, opacity: 0.8 }}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Form */}
        <TaskForm onAdd={handleAdd} />

        {/* Grid */}
        <TaskGrid tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />

        {/* Footer */}
        <footer
          style={{
            marginTop: "auto",
            paddingTop: 40,
            textAlign: "center",
            fontSize: 14,
            color: "#7a869a",
            fontWeight: 500,
          }}
        >
          <div>Developed by Pradeep Kumar</div>
          <div style={{ marginTop: 8 }}>
            Contact: <a href="mailto:linkpradeep11@gmail.com" style={{ color: "#6366f1", textDecoration: "none" }}>linkpradeep11@gmail.com</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
