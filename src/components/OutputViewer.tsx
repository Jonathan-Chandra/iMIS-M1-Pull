import { useState, useEffect, useRef } from "react";

/**
 * Represents a single timestamped log entry displayed in the {@link OutputViewer}.
 *
 * @property id - Monotonically increasing integer used as a stable React key.
 * @property timestamp - The `Date` at which the entry was created.
 * @property message - The text content of the log entry.
 * @property level - Severity level, controls the colour used for display.
 */
interface LogEntry {
  id: number;
  timestamp: Date;
  message: string;
  level: "info" | "warn" | "error" | "success";
}

/**
 * Custom React hook that manages a list of {@link LogEntry} objects and exposes
 * helpers for appending and clearing entries.
 *
 * Designed to be used alongside {@link OutputViewer}: the parent component calls
 * `useLogger()` to obtain `logs` (state) and `log`/`clear` (mutators), then
 * passes `logs` down to `<OutputViewer logs={logs} />`.
 *
 * @returns An object with:
 * - `logs` — the current array of log entries (React state).
 * - `log(message, level?)` — appends a new entry; `level` defaults to `"info"`.
 * - `clear()` — empties the log.
 */
export function useLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  /** Ref-based counter ensures unique IDs without triggering re-renders. */
  const idRef = useRef(0);

  /**
   * Appends a new log entry to the list.
   *
   * @param message - Text to display in the viewer.
   * @param level - Severity level for colour coding. Defaults to `"info"`.
   */
  const log = (message: string, level: LogEntry["level"] = "info") => {
    setLogs((prev) => [
      ...prev,
      { id: idRef.current++, timestamp: new Date(), message, level },
    ]);
  };

  /** Clears all log entries from the viewer. */
  const clear = () => setLogs([]);

  return { logs, log, clear };
}

/** Maps each log severity level to its display colour in the terminal-style viewer. */
const levelColors: Record<LogEntry["level"], string> = {
  info: "#569cd6",    // blue
  warn: "#ffd700",    // yellow
  error: "#f44747",   // red
  success: "#4ec9b0", // green
};

/**
 * A terminal-style read-only log viewer that renders an ordered list of
 * {@link LogEntry} objects with timestamps, colour-coded severity badges, and
 * auto-scroll to the most recent entry.
 *
 * Intended to be paired with the {@link useLogger} hook:
 * ```tsx
 * const { logs, log } = useLogger();
 * <OutputViewer logs={logs} />
 * ```
 *
 * @component
 * @param logs - The array of log entries to render, provided by {@link useLogger}.
 */
export function OutputViewer({ logs }: { logs: LogEntry[] }) {
  /** Ref attached to an invisible div at the bottom of the list for auto-scrolling. */
  const bottomRef = useRef<HTMLDivElement>(null);

  /** Scrolls to the bottom sentinel element whenever the `logs` array changes. */
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