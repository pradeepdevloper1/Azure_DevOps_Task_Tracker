import * as XLSX from "xlsx";
import { Task, TaskStatus } from "../types";

// Row background colors per status (ARGB hex, no #)
const STATUS_ROW_FILL: Record<TaskStatus, string> = {
  "Analysis":        "FFDBEAFE",
  "Dev In Progress": "FFFFF9C4",
  "Dev Complete":    "FFD1FAE5",
  "PR Raised":       "FFFCE4EC",
  "PR Approved":     "FFE0F2F1",
  "PR Merged":       "FFD5F5E3",
  "QA In Progress":  "FFFFF3E0",
  "QA Complete":     "FFF9FBE7",
  "Done":            "FFE8F5E9",
};

const STATUS_TEXT_COLOR: Record<TaskStatus, string> = {
  "Analysis":        "FF1565C0",
  "Dev In Progress": "FFE65100",
  "Dev Complete":    "FF2E7D32",
  "PR Raised":       "FFB71C1C",
  "PR Approved":     "FF00695C",
  "PR Merged":       "FF1B5E20",
  "QA In Progress":  "FFBF360C",
  "QA Complete":     "FF558B2F",
  "Done":            "FF004D40",
};

function makeStyle(bold = false, textColor = "FF1E293B", bgColor?: string, fontSize = 11) {
  return {
    font: { name: "Calibri", sz: fontSize, bold, color: { rgb: textColor } },
    fill: bgColor
      ? { fgColor: { rgb: bgColor }, patternType: "solid" as const }
      : { patternType: "none" as const },
    alignment: { vertical: "center" as const, wrapText: true },
    border: {
      top:    { style: "thin" as const, color: { rgb: "FFD0D7E2" } },
      bottom: { style: "thin" as const, color: { rgb: "FFD0D7E2" } },
      left:   { style: "thin" as const, color: { rgb: "FFD0D7E2" } },
      right:  { style: "thin" as const, color: { rgb: "FFD0D7E2" } },
    },
  };
}

export function exportToExcel(rows: Task[]): void {
  if (!rows.length) return;

  const wb = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = {};

  // Header row
  const headers = ["Project", "AzureDevOps ID", "Task Description", "Status", "Remark"];
  const headerBg = "FF1F4E79";

  headers.forEach((h, c) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c });
    ws[cellRef] = { v: h, t: "s", s: makeStyle(true, "FFFFFFFF", headerBg, 12) };
  });

  // Data rows
  const merges: XLSX.Range[] = [];
  let groupStart = 1;

  rows.forEach((row, idx) => {
    const r = idx + 1;
    const status = row.status as TaskStatus;
    const rowBg = status ? STATUS_ROW_FILL[status] : "FFFFFFFF";
    const statusColor = status ? STATUS_TEXT_COLOR[status] : "FF1E293B";

    ws[XLSX.utils.encode_cell({ r, c: 0 })] = {
      v: row.projectName, t: "s",
      s: makeStyle(true, "FF1F4E79", "FFF1F5F9"),
    };
    ws[XLSX.utils.encode_cell({ r, c: 1 })] = {
      v: row.azureDevOpsId, t: "s",
      s: makeStyle(false, "FF374151", rowBg),
    };
    ws[XLSX.utils.encode_cell({ r, c: 2 })] = {
      v: row.taskDescription, t: "s",
      s: makeStyle(false, "FF1E293B", rowBg),
    };
    ws[XLSX.utils.encode_cell({ r, c: 3 })] = {
      v: row.status, t: "s",
      s: makeStyle(true, statusColor, rowBg),
    };
    ws[XLSX.utils.encode_cell({ r, c: 4 })] = {
      v: row.remarks || "", t: "s",
      s: makeStyle(false, "FF64748B", rowBg),
    };

    // Merge project cells for consecutive same-project rows
    const isLast = idx === rows.length - 1;
    const nextProject = !isLast ? rows[idx + 1].projectName : null;
    if (nextProject !== row.projectName || isLast) {
      if (r > groupStart) {
        merges.push({ s: { r: groupStart, c: 0 }, e: { r, c: 0 } });
      }
      groupStart = r + 1;
    }
  });

  ws["!merges"] = merges;
  ws["!cols"] = [{ wch: 20 }, { wch: 16 }, { wch: 58 }, { wch: 18 }, { wch: 24 }];
  ws["!rows"] = [{ hpt: 28 }, ...rows.map(() => ({ hpt: 40 }))];
  ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: rows.length, c: 4 } });

  XLSX.utils.book_append_sheet(wb, ws, "Tasks");
  XLSX.writeFile(wb, `tasks_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export function validateForm(form: Omit<Task, "id">): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.projectName) errors.projectName = "Project name is required";
  if (!form.azureDevOpsId.trim()) errors.azureDevOpsId = "DevOps ID is required";
  if (!form.taskDescription.trim()) errors.taskDescription = "Description is required";
  if (!form.status) errors.status = "Status is required";
  return errors;
}
