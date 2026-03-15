import React, { useState, CSSProperties } from "react";
import { Task } from "../types";
import { ASSIGNED_TO_OPTIONS } from "../utils/constants";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.assigned-to-dropdown')) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleAssigneeToggle = (assignee: string): void => {
    setSelectedAssignees((prev) => {
      if (prev.includes(assignee)) {
        return prev.filter((a) => a !== assignee);
      } else {
        return [...prev, assignee];
      }
    });
  };

  const clearAllFilters = (): void => {
    setSelectedAssignees([]);
  };

  const getFilteredTasks = (): Task[] => {
    if (selectedAssignees.length === 0) {
      return tasks;
    }
    return tasks.filter((task) => 
      task.assignedTo && selectedAssignees.includes(task.assignedTo)
    );
  };

  const filteredTasks = getFilteredTasks();

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
          {selectedAssignees.length > 0 && (
            <>
              <span style={{
                background: "#f0f9ff",
                color: "#0369a1",
                borderRadius: 20,
                padding: "2px 10px",
                fontSize: 11.5,
                fontWeight: 700,
                fontFamily: "'Sora', sans-serif",
              }}>
                {filteredTasks.length} filtered
              </span>
              <button
                onClick={clearAllFilters}
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#fecaca";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#fee2e2";
                }}
              >
                Clear Filters
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => exportToExcel(filteredTasks)}
          disabled={filteredTasks.length === 0}
          style={{
            background: exportHovered && filteredTasks.length ? "#f0fdf4" : "#fff",
            color: filteredTasks.length ? "#16a34a" : "#94a3b8",
            border: `1.5px solid ${filteredTasks.length ? "#86efac" : "#e2e8f0"}`,
            borderRadius: 9,
            padding: "7px 16px",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: filteredTasks.length ? "pointer" : "not-allowed",
            fontFamily: "'Sora', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 7,
            transition: "background 0.15s, border-color 0.15s",
            boxShadow: exportHovered && filteredTasks.length ? "0 2px 8px rgba(22,163,74,0.15)" : "none",
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
                <th style={{ ...thStyle, position: "relative" }}>
                  <div className="assigned-to-dropdown" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span>Assigned To</span>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 4,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "#f1f5f9";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "none";
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a869a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                        </svg>
                      </button>
                      
                      {dropdownOpen && (
                        <div className="assigned-to-dropdown" style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 1000,
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 8,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          minWidth: 200,
                          maxHeight: 300,
                          overflowY: "auto",
                          marginTop: 4,
                        }}>
                          <div style={{
                            padding: "8px 12px",
                            borderBottom: "1px solid #e2e8f0",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#374151",
                            fontFamily: "'Sora', sans-serif",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}>
                            <span>Filter by Assignee</span>
                            {selectedAssignees.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearAllFilters();
                                }}
                                style={{
                                  background: "#fee2e2",
                                  color: "#dc2626",
                                  border: "none",
                                  borderRadius: 4,
                                  padding: "2px 6px",
                                  fontSize: 10,
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  fontFamily: "'Sora', sans-serif",
                                }}
                              >
                                Clear
                              </button>
                            )}
                          </div>
                          
                          <div style={{ padding: "4px" }}>
                            {ASSIGNED_TO_OPTIONS.map((assignee) => {
                              const isChecked = selectedAssignees.includes(assignee);
                              const taskCount = tasks.filter((task) => task.assignedTo === assignee).length;
                              
                              return (
                                <label
                                  key={assignee}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "6px 8px",
                                    borderRadius: 4,
                                    cursor: "pointer",
                                    fontSize: 12,
                                    fontFamily: "'Sora', sans-serif",
                                    transition: "background 0.15s",
                                  }}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLLabelElement).style.background = "#f8fafc";
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLLabelElement).style.background = "transparent";
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleAssigneeToggle(assignee)}
                                    style={{
                                      width: 14,
                                      height: 14,
                                      accentColor: "#6366f1",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <span style={{ 
                                    flex: 1,
                                    color: isChecked ? "#6366f1" : "#374151",
                                    fontWeight: isChecked ? 600 : 400,
                                  }}>
                                    {assignee}
                                  </span>
                                  <span style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#9ca3af",
                                    background: "#f3f4f6",
                                    padding: "1px 4px",
                                    borderRadius: 6,
                                    minWidth: 16,
                                    textAlign: "center",
                                  }}>
                                    {taskCount}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Remarks</th>
                <th style={{ ...thStyle, width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
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
              ) : filteredTasks.length === 0 && selectedAssignees.length > 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "56px 20px",
                      color: "#94a3b8",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 10, opacity: 0.5 }}>🔍</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>No tasks match current filters</div>
                    <div style={{ fontSize: 12 }}>Try adjusting your filter criteria</div>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task, idx) => (
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
