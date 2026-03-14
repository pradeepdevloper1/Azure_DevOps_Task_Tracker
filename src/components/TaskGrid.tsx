import React, { useState, CSSProperties } from "react";
import { Task } from "../types";
import { exportToExcel } from "../utils/helpers";
import TaskRow from "./TaskRow";

interface Props {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

const thStyle: CSSProperties = {
  padding: "11px 14px",
  textAlign: "left",
  fontWeight: 800,
  fontSize: 10.5,
  color: "#7a869a",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  borderBottom: "2px solid #e8ecf8",
  fontFamily: "'Sora', sans-serif",
  whiteSpace: "nowrap",
  background: "transparent",
};

const TaskGrid: React.FC<Props> = ({ tasks, onUpdate, onDelete }) => {
  const [exportHovered, setExportHovered] = useState(false);

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
            Task Registry
          </span>
          <span style={{
            background: tasks.length ? "#ede9fe" : "#f1f5f9",
            color: tasks.length ? "#7c3aed" : "#94a3b8",
            borderRadius: 20,
            padding: "2px 10px",
            fontSize: 11.5,
            fontWeight: 700,
            fontFamily: "'Sora', sans-serif",
          }}>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <button
          onClick={() => exportToExcel(tasks)}
          disabled={tasks.length === 0}
          style={{
            background: exportHovered && tasks.length ? "#f0fdf4" : "#fff",
            color: tasks.length ? "#16a34a" : "#94a3b8",
            border: `1.5px solid ${tasks.length ? "#86efac" : "#e2e8f0"}`,
            borderRadius: 9,
            padding: "7px 16px",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: tasks.length ? "pointer" : "not-allowed",
            fontFamily: "'Sora', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 7,
            transition: "background 0.15s, border-color 0.15s",
            boxShadow: exportHovered && tasks.length ? "0 2px 8px rgba(22,163,74,0.15)" : "none",
          }}
          onMouseEnter={() => setExportHovered(true)}
          onMouseLeave={() => setExportHovered(false)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export to Excel
        </button>
      </div>

      {/* Table */}
      <div style={{
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(99,102,241,0.06)",
        border: "1px solid #e8ecf8",
        overflow: "hidden",
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #f8f7ff 0%, #f0f4ff 100%)" }}>
                <th style={{ ...thStyle, width: 40 }}>#</th>
                <th style={thStyle}>Project Name</th>
                <th style={thStyle}>Azure DevOps ID</th>
                <th style={thStyle}>Task Description</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Remarks</th>
                <th style={{ ...thStyle, width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: "center",
                      padding: "56px 20px",
                      color: "#94a3b8",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.5 }}>📋</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>No tasks yet</div>
                    <div style={{ fontSize: 12 }}>Use the form above to add your first task</div>
                  </td>
                </tr>
              ) : (
                tasks.map((task, idx) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    index={idx}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskGrid;
