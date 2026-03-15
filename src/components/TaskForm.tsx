import React, { useState, CSSProperties } from "react";
import { Task, TaskFormData, FormErrors } from "../types";
import { STATUS_OPTIONS, PROJECT_OPTIONS, ASSIGNED_TO_OPTIONS, EMPTY_FORM } from "../utils/constants";
import { validateForm } from "../utils/helpers";
import FormField, { getInputStyle } from "./FormField";

interface Props {
  onAdd: (task: TaskFormData) => void;
}

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<TaskFormData>({ ...EMPTY_FORM });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string>("");

  const set = (key: keyof TaskFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((ev) => ({ ...ev, [key]: undefined }));
  };

  const handleAdd = () => {
    const errs = validateForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onAdd({ ...form });
    setForm({ ...EMPTY_FORM });
    setErrors({});
  };

  const inputStyle = (key: string): CSSProperties => ({
    ...getInputStyle(!!errors[key as keyof FormErrors]),
    boxShadow: focused === key ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
    borderColor: focused === key ? "#6366f1" : errors[key as keyof FormErrors] ? "#f44336" : "#e2e8f0",
  });

  const focusHandlers = (key: string) => ({
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(""),
  });

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 8px 32px rgba(99,102,241,0.07)",
        padding: "20px 24px",
        border: "1px solid #e8ecf8",
        marginBottom: 24,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "#6366f1",
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontFamily: "'Sora', sans-serif",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
          }}
        >
          +
        </span>
        New Task Entry
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
        {/* Project Name Dropdown */}
        <FormField label="Project Name" error={undefined} flex="1 1 160px" minWidth={150}>
          <select
            value={form.projectName}
            onChange={set("projectName")}
            style={{ ...inputStyle("projectName"), cursor: "pointer" }}
            {...focusHandlers("projectName")}
          >
            <option value="">Select project…</option>
            {PROJECT_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </FormField>

        {/* Azure DevOps ID */}
        <FormField label="Azure DevOps ID" error={undefined} flex="0 1 130px" minWidth={110}>
          <input
            type="text"
            placeholder="e.g. #4821"
            value={form.azureDevOpsId}
            onChange={set("azureDevOpsId")}
            style={inputStyle("azureDevOpsId")}
            {...focusHandlers("azureDevOpsId")}
          />
        </FormField>

        {/* Task Description */}
        <FormField label="Task Description" error={undefined} flex="2 1 200px" minWidth={160}>
          <input
            type="text"
            placeholder="Brief description of task..."
            value={form.taskDescription}
            onChange={set("taskDescription")}
            style={inputStyle("taskDescription")}
            {...focusHandlers("taskDescription")}
          />
        </FormField>

        {/* Assigned To */}
        <FormField label="Assigned To" error={undefined} flex="1 1 155px" minWidth={145}>
          <select
            value={form.assignedTo}
            onChange={set("assignedTo")}
            style={{ ...inputStyle("assignedTo"), cursor: "pointer" }}
            {...focusHandlers("assignedTo")}
          >
            <option value="">Select assignee…</option>
            {ASSIGNED_TO_OPTIONS.map((person) => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </FormField>

        {/* Status */}
        <FormField label="Status" error={undefined} flex="1 1 155px" minWidth={145}>
          <select
            value={form.status}
            onChange={set("status")}
            style={{ ...inputStyle("status"), cursor: "pointer" }}
            {...focusHandlers("status")}
          >
            <option value="">Select status…</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FormField>

        {/* Remarks */}
        <FormField label="Remarks" error={undefined} flex="1 1 140px" minWidth={130}>
          <input
            type="text"
            placeholder="Optional note..."
            value={form.remarks}
            onChange={set("remarks")}
            style={inputStyle("remarks")}
            {...focusHandlers("remarks")}
          />
        </FormField>

        {/* Submit */}
        <div style={{ flex: "0 0 auto" }}>
          <button
            onClick={handleAdd}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              border: "none",
              borderRadius: 9,
              padding: "9px 22px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              boxShadow: "0 4px 14px rgba(99,102,241,0.4)",
              letterSpacing: "0.03em",
              transition: "transform 0.1s, box-shadow 0.1s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(99,102,241,0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(99,102,241,0.4)";
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Error Messages Row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8, marginLeft: 0, paddingLeft: 0 }}>
        <div style={{ flex: "1 1 160px", minWidth: 150, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {errors.projectName && (
            <span style={{ color: "#f44336", fontSize: 11, display: "block", textAlign: "left", width: "100%" }}>
              ⚠ {errors.projectName}
            </span>
          )}
        </div>
        <div style={{ flex: "0 1 120px", minWidth: 110, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {errors.azureDevOpsId && (
            <span style={{ color: "#f44336", fontSize: 11, display: "block", textAlign: "left", width: "100%" }}>
              ⚠ {errors.azureDevOpsId}
            </span>
          )}
        </div>
        <div style={{ flex: "2 1 200px", minWidth: 160, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {errors.taskDescription && (
            <span style={{ color: "#f44336", fontSize: 11, display: "block", textAlign: "left", width: "100%" }}>
              ⚠ {errors.taskDescription}
            </span>
          )}
        </div>
        <div style={{ flex: "1 1 155px", minWidth: 145, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {errors.assignedTo && (
            <span style={{ color: "#f44336", fontSize: 11, display: "block", textAlign: "left", width: "100%" }}>
              ⚠ {errors.assignedTo}
            </span>
          )}
        </div>
        <div style={{ flex: "1 1 155px", minWidth: 145, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {errors.status && (
            <span style={{ color: "#f44336", fontSize: 11, display: "block", textAlign: "left", width: "100%" }}>
              ⚠ {errors.status}
            </span>
          )}
        </div>
        <div style={{ flex: "1 1 140px", minWidth: 130, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* Remarks field doesn't have validation, but we need div to maintain alignment */}
        </div>
        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* Submit button space - no error messages */}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
