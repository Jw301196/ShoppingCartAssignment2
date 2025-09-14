import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id != id));

  const push = (msg) => {
    const id =
      globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random());
    const toast = { id, ...msg };
    setToasts((t) => [...t, toast]);
    setTimeout(() => dismiss(id), 2500);
  };
  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-[60]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-gray-900 text-white rounded-xl shadow px-4 py-3 text-sm flex items-start gap-3 max-w-xs"
          >
            <div className="mt-0.5">✅</div>
            <div className="flex-1">
              <div className="font-medium">{t.title}</div>
              {t.description && (
                <div className="text-gray-300">{t.description}</div>
              )}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};
