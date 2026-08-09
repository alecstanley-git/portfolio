import React from "react";
import { Icon } from "../core/Icon.jsx";

/* One toast at a time. A second call replaces the first rather than stacking a
   queue — nothing in this product raises two notifications at once, and a stack
   would put a moving column of boxes over the content. */

const ToastContext = React.createContext(() => {});

const VISIBLE_MS = 2600;

/** Returns showToast(message, icon) — call it from any descendant of the provider. */
export function useToast() {
  return React.useContext(ToastContext);
}

/** Mounts the live region and hands descendants a way to raise a toast. */
export function ToastProvider({ children, duration = VISIBLE_MS }) {
  const [toast, setToast] = React.useState(null);
  const timer = React.useRef(null);

  const showToast = React.useCallback(
    (message, icon = "check") => {
      clearTimeout(timer.current);
      // The id keys the entrance: raising the same message twice should replay
      // the rise, not leave a static box sitting there.
      setToast({ id: Date.now(), message, icon });
      timer.current = setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {/* Always mounted, so a screen reader announces the message when it
          arrives rather than announcing the arrival of a new region. */}
      <div
        className="no-print"
        role="status"
        aria-live="polite"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "var(--space-8)",
          zIndex: 60,
          transform: "translateX(-50%)",
          maxWidth: "calc(100% - (var(--gutter-lg) * 2))",
          pointerEvents: "none",
        }}
      >
        {toast ? <ToastBox key={toast.id} icon={toast.icon} message={toast.message} /> : null}
      </div>
    </ToastContext.Provider>
  );
}

/** The box itself. Split out so remounting it replays the entrance. */
function ToastBox({ icon, message }) {
  const [shown, setShown] = React.useState(false);

  // Paint at rest first, then flip on the next frame so the transition runs.
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-5)",
        background: "var(--surface-raised)",
        border: "1px solid var(--border-line)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-lg)",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(8px)",
        transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      }}
    >
      <Icon name={icon} size="md" color="var(--ignition-500)" />
      <span style={{ font: "var(--type-body-sm)", color: "var(--text-primary)", overflowWrap: "anywhere" }}>
        {message}
      </span>
    </div>
  );
}
