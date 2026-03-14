import { TaskStatus, StatusStyle, ProjectName } from "../types";

export const PROJECT_OPTIONS: ProjectName[] = ["Sherwin Williams", "GMDR2"];

export const STATUS_OPTIONS: TaskStatus[] = [
  "Analysis",
  "Dev In Progress",
  "Dev Complete",
  "PR Raised",
  "PR Approved",
  "PR Merged",
  "QA In Progress",
  "QA Complete",
  "Done",
];

export const STATUS_COLORS: Record<TaskStatus, StatusStyle> = {
  "Analysis":        { bg: "#e8f4fd", text: "#1565c0", border: "#90caf9" },
  "Dev In Progress": { bg: "#fff8e1", text: "#e65100", border: "#ffcc02" },
  "Dev Complete":    { bg: "#e8f5e9", text: "#2e7d32", border: "#a5d6a7" },
  "PR Raised":       { bg: "#f3e5f5", text: "#6a1b9a", border: "#ce93d8" },
  "PR Approved":     { bg: "#e0f7fa", text: "#00695c", border: "#80cbc4" },
  "PR Merged":       { bg: "#e8eaf6", text: "#283593", border: "#9fa8da" },
  "QA In Progress":  { bg: "#fff3e0", text: "#bf360c", border: "#ffb74d" },
  "QA Complete":     { bg: "#f9fbe7", text: "#558b2f", border: "#c5e1a5" },
  "Done":            { bg: "#e0f2f1", text: "#004d40", border: "#80cbc4" },
};

export const EMPTY_FORM: Omit<import("../types").Task, "id"> = {
  projectName: "",
  azureDevOpsId: "",
  taskDescription: "",
  status: "",
  remarks: "",
};
