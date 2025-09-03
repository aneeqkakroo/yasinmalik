import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`px-4 py-3 rounded-xl shadow-lg text-sm font-medium
        ${type === "success" ? "bg-emerald-600 text-white" : ""}
        ${type === "error" ? "bg-rose-600 text-white" : ""}
        ${type === "info" ? "bg-gray-800 text-white" : ""}`}
      >
        {message}
      </div>
    </div>
  );
}
