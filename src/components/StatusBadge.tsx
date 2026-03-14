import React from "react";
import { TaskStatus } from "../types";
import { STATUS_COLORS } from "../utils/constants";

interface Props {
  status: TaskStatus | "";
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  if (!status) return <span style={{ color: "#ccc" }}>—</span>;
  const c = STATUS_COLORS[status as TaskStatus] ?? { bg: "#f0f0f0", text: "#555", border: "#ccc" };

  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        borderRadius: 20,
        padding: "3px 11px",
        fontSize: 11.5,
        fontWeight: 700,
        whiteSpace: "nowrap",
        fontFamily: "'Sora', sans-serif",
        letterSpacing: "0.02em",
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
