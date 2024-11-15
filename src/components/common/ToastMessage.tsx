import React, { useEffect, useState, ReactNode } from "react";

interface ToastMessageProps {
  type?: string | null;
  title: string;
  message: string;
  role?: string;
  onClose: () => void;
  duration?: number;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  type,
  title,
  message,
  role,
  onClose,
  duration = 6000,
}) => {
  const [visible, setVisible] = useState(true);

  const parseMessage = (message: string): ReactNode[] => {
    const quoteRegex = /"(.*?)"/g;
    const parts = message.split(quoteRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const displayText = part.length > 30 ? `${part.slice(0, 30)}...` : part;
        return (
          <span key={index} style={{ fontWeight: "bold" }}>
            {displayText}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const parsedMessage = parseMessage(message);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="toast-wrap">
      <div
        className={`toast ${
          visible ? "toast-show" : ""
        } flex items-center gap-4`}
      >
        <div className={type === null ? "hidden" : ""}>
          <img
            src={`/icons/toast-${type}.svg`}
            alt={type || "toast-icon"}
            className="w-[16px] md:w-[24px]"
          />
        </div>
        <div className="flex flex-col gap-1 toast-content">
          <div className="text-[14px] leading-[18px] font-bold text-primary">
            {title}
          </div>
          <div className="text-[12px] md:text-[14px] leading-[14px] md:leading-[21px] font-normal text-primary">
            <span className="role-gradient">{role} </span>
            {parsedMessage}
          </div>
        </div>
        {/* Uncomment if you want a close button */}
        {/* <button onClick={onClose}>
          <img src="/icons/close.svg" alt="close" className="w-[24px]" />
        </button> */}
      </div>
    </div>
  );
};

export default ToastMessage;
