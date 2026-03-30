import { useState, useEffect, useRef } from "react";

interface LogEntry {
  id: number;
  timestamp: Date;
  message: string;
  level: "info" | "warn" | "error" | "success";
}

export function useLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const idRef = useRef(0);

  const log = (message: string, level: LogEntry["level"] = "info") => {
    setLogs((prev) => [
      ...prev,
      { id: idRef.current++, timestamp: new Date(), message, level },
    ]);
  };

  const clear = () => setLogs([]);

  return { logs, log, clear };
}

const levelColors: Record<LogEntry["level"], string> = {
  info: "#569cd6",    // blue
  warn: "#ffd700",    // yellow
  error: "#f44747",   // red
  success: "#4ec9b0", // green
};

export function OutputViewer({ logs }: { logs: LogEntry[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "#cccccc",
        fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
        fontSize: "13px",
        padding: "12px",
        borderRadius: "6px",
        height: "300px",
        overflowY: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        textAlign: "left",
      }}
    >
      {logs.length === 0 && (
        <span style={{ color: "#555" }}>Waiting for output...</span>
      )}
      {logs.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "2px" }}>
          <span style={{ color: "#6a6a6a" }}>
            [{entry.timestamp.toLocaleTimeString()}]
          </span>{" "}
          <span style={{ color: levelColors[entry.level] }}>
            [{entry.level.toUpperCase()}]
          </span>{" "}
          {entry.message}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}