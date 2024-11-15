import React, { createContext, useContext, useState, ReactNode } from "react";
import ToastMessage from "src/components/common/ToastMessage";

interface Toast {
  id: number;
  type?: string;
  title: string;
  message: string;
  role?: string;
}

interface ToastContextProps {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

let addToastGlobal: ((toast: Omit<Toast, "id">) => void) | undefined;

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = ({ type, title, message, role }: Omit<Toast, "id">) => {
    const newToast: Toast = {
      id: Date.now(),
      type,
      title,
      message,
      role,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, 6000);
  };

  addToastGlobal = addToast;

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        <div className="toast-outer pt-2 pb-0 md:py-2 md:pt-12 flex flex-col gap-2 items-end">
          {toasts.map((toast) => (
            <ToastMessage
              key={toast.id}
              type={toast.type}
              title={toast.title}
              message={toast.message}
              role={toast.role}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const addToast = (title: string, message: string) => {
  if (addToastGlobal) {
    addToastGlobal({ title, message });
  } else {
    console.error("addToast function is not initialized yet.");
  }
};
