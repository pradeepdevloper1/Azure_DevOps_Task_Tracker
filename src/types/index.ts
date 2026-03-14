export type TaskStatus =
  | "Analysis"
  | "Dev In Progress"
  | "Dev Complete"
  | "PR Raised"
  | "PR Approved"
  | "PR Merged"
  | "QA In Progress"
  | "QA Complete"
  | "Done";

export type ProjectName = "Sherwin Williams" | "GMDR2" | "";

export interface Task {
  id: number;
  projectName: ProjectName;
  azureDevOpsId: string;
  taskDescription: string;
  status: TaskStatus | "";
  remarks: string;
}

export type TaskFormData = Omit<Task, "id">;

export interface FormErrors {
  projectName?: string;
  azureDevOpsId?: string;
  taskDescription?: string;
  status?: string;
}

export interface StatusStyle {
  bg: string;
  text: string;
  border: string;
}
