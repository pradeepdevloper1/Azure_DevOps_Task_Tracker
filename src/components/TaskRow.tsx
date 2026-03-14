import React, { useState, CSSProperties } from "react";
import { Task, FormErrors } from "../types";
import { STATUS_OPTIONS, PROJECT_OPTIONS } from "../utils/constants";
import { validateForm } from "../utils/helpers";
import StatusBadge from "./StatusBadge";
import { getInputStyle } from "./FormField";

interface Props {
  task: Task;
  index: number;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

const cellStyle: CSSProperties = {
  padding: "10px 14px",
  borderBottom: "1px solid #f1f5f9",
  color: "#1e293b",
  fontFamily: "'Sora', sans-serif",
  fontSize: 13,
  verticalAlign: "middle",
};

const editInputStyle = (err: boolean): CSSProperties => ({
  ...getInputStyle(err),
  padding: "6px 10px",
  fontSize: 12,
  width: "100%",
  minWidth: 80,
});

const TaskRow: React.FC<Props> = ({ task, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Task>({ ...task });
  const [errors, setErrors] = useState<FormErrors>({});
  const [hovered, setHovered] = useState(false);

  const handleSave = () => {
    const errs = validateForm(editForm);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onUpdate({ ...editForm });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setEditForm({ ...task });
    setIsEditing(false);
    setErrors({});
  };

  const set = (key: keyof Task) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((ev) => ({ ...ev, [key]: undefined }));
  };

  const rowBg = isEditing ? "#f5f3ff" : hovered ? "#f8faff" : index % 2 === 0 ? "#ffffff" : "#fafbff";

  return (
    <tr
      style={{ background: rowBg, transition: "background 0.15s" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* # */}
      <td style={{ ...cellStyle, color: "#94a3b8", fontWeight: 700, fontSize: 12, width: 40 }}>
        {index + 1}
      </td>

      {/* Project Name */}
      <td style={cellStyle}>
        {isEditing ? (
          <div>
            <select value={editForm.projectName} onChange={set("projectName")} style={{ ...editInputStyle(!!errors.projectName), minWidth: 140, cursor: "pointer" }}>
              <option value="">Select…</option>
              {PROJECT_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.projectName && <div style={{ color: "#f44336", fontSize: 10.5, marginTop: 2 }}>{errors.projectName}</div>}
          </div>
        ) : (
          <span style={{ fontWeight: 600, color: "#1e293b" }}>{task.projectName}</span>
        )}
      </td>

      {/* Azure DevOps ID */}
      <td style={cellStyle}>
        {isEditing ? (
          <div>
            <input value={editForm.azureDevOpsId} onChange={set("azureDevOpsId")} style={{ ...editInputStyle(!!errors.azureDevOpsId), maxWidth: 110 }} />
            {errors.azureDevOpsId && <div style={{ color: "#f44336", fontSize: 10.5, marginTop: 2 }}>{errors.azureDevOpsId}</div>}
          </div>
        ) : (
          <a
            href={`https://dev.azure.com/Exacta-E6/Zeta/_queries/edit/${task.azureDevOpsId}/`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Courier New', monospace",
              background: "#ede9fe",
              borderRadius: 5,
              padding: "3px 9px",
              fontSize: 12,
              color: "#6366f1",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ddd6fe";
              e.currentTarget.style.color = "#7c3aed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ede9fe";
              e.currentTarget.style.color = "#6366f1";
            }}
          >
            {task.azureDevOpsId}
          </a>
        )}
      </td>

      {/* Task Description */}
      <td style={{ ...cellStyle, maxWidth: 240 }}>
        {isEditing ? (
          <div>
            <input value={editForm.taskDescription} onChange={set("taskDescription")} style={{ ...editInputStyle(!!errors.taskDescription), minWidth: 160 }} />
            {errors.taskDescription && <div style={{ color: "#f44336", fontSize: 10.5, marginTop: 2 }}>{errors.taskDescription}</div>}
          </div>
        ) : (
          <span
            title={task.taskDescription}
            style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 230 }}
          >
            {task.taskDescription}
          </span>
        )}
      </td>

      {/* Status */}
      <td style={cellStyle}>
        {isEditing ? (
          <div>
            <select value={editForm.status} onChange={set("status")} style={{ ...editInputStyle(!!errors.status), minWidth: 150, cursor: "pointer" }}>
              <option value="">Select…</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.status && <div style={{ color: "#f44336", fontSize: 10.5, marginTop: 2 }}>{errors.status}</div>}
          </div>
        ) : (
          <StatusBadge status={task.status} />
        )}
      </td>

      {/* Remarks */}
      <td style={{ ...cellStyle, color: "#64748b" }}>
        {isEditing ? (
          <input value={editForm.remarks} onChange={set("remarks")} style={{ ...editInputStyle(false), minWidth: 110 }} />
        ) : (
          task.remarks || <span style={{ color: "#cbd5e1" }}>—</span>
        )}
      </td>

      {/* Actions */}
      <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
        {isEditing ? (
          <div style={{ display: "flex", gap: 6 }}>
            <ActionBtn label="✓ Save" bg="#dcfce7" color="#16a34a" hoverBg="#bbf7d0" onClick={handleSave} />
            <ActionBtn label="✕ Cancel" bg="#fee2e2" color="#dc2626" hoverBg="#fecaca" onClick={handleCancel} />
          </div>
        ) : (
          <div style={{ display: "flex", gap: 6 }}>
            <ActionBtn label="✏ Edit" bg="#ede9fe" color="#7c3aed" hoverBg="#ddd6fe" onClick={() => { setEditForm({ ...task }); setIsEditing(true); }} />
            <ActionBtn label="🗑 Delete" bg="#fef2f2" color="#ef4444" hoverBg="#fee2e2" onClick={() => onDelete(task.id)} />
          </div>
        )}
      </td>
    </tr>
  );
};

interface ActionBtnProps {
  label: string;
  bg: string;
  color: string;
  hoverBg: string;
  onClick: () => void;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ label, bg, color, hoverBg, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      style={{
        background: hovered ? hoverBg : bg,
        color,
        border: "none",
        borderRadius: 7,
        padding: "5px 11px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Sora', sans-serif",
        transition: "background 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </button>
  );
};

export default TaskRow;
