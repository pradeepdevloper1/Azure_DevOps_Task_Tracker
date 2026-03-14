import React, { CSSProperties } from "react";

interface Props {
  label: string;
  error?: string;
  flex?: string;
  minWidth?: number;
  children: React.ReactNode;
}

export const labelStyle: CSSProperties = {
  fontSize: 10.5,
  fontWeight: 700,
  color: "#7a869a",
  letterSpacing: "0.07em",
  marginBottom: 5,
  display: "block",
  fontFamily: "'Sora', sans-serif",
  textTransform: "uppercase",
};

export const getInputStyle = (hasError: boolean): CSSProperties => ({
  border: `1.5px solid ${hasError ? "#f44336" : "#e2e8f0"}`,
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: 13,
  fontFamily: "'Sora', sans-serif",
  outline: "none",
  background: "#ffffff",
  color: "#1e293b",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
});

const FormField: React.FC<Props> = ({ label, error, flex = "1 1 140px", minWidth = 120, children }) => (
  <div style={{ flex, minWidth }}>
    <label style={labelStyle}>{label}</label>
    {children}
    {error && (
      <span style={{ color: "#f44336", fontSize: 11, marginTop: 3, display: "block" }}>
        ⚠ {error}
      </span>
    )}
  </div>
);

export default FormField;
