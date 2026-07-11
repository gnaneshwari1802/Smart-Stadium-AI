import { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from "lucide-react";

function NotificationToast({
  notification,
  duration = 5000,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notification) return;

    setVisible(true);

    const timer = setTimeout(() => {
      closeToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [notification]);

  const closeToast = () => {
    setVisible(false);

    setTimeout(() => {
      onClose?.();
    }, 250);
  };

  if (!notification) return null;

  const variants = {
    success: {
      icon: <CheckCircle2 size={22} />,
      bg: "bg-green-600",
    },

    warning: {
      icon: <AlertTriangle size={22} />,
      bg: "bg-yellow-500",
    },

    danger: {
      icon: <XCircle size={22} />,
      bg: "bg-red-600",
    },

    info: {
      icon: <Info size={22} />,
      bg: "bg-blue-600",
    },
  };

  const variant = variants[notification.type] || variants.info;

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 ${
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-96 opacity-0"
      }`}
    >
      <div
        className={`${variant.bg} text-white rounded-xl shadow-2xl w-96 overflow-hidden`}
      >
        <div className="flex items-start p-4 gap-3">
          <div className="mt-1">
            {variant.icon}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg">
              {notification.title}
            </h3>

            <p className="text-sm mt-1 text-white/90">
              {notification.message}
            </p>

            <p className="text-xs mt-3 opacity-80">
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          <button
            onClick={closeToast}
            className="hover:bg-white/20 rounded-full p-1 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-white animate-progress"
            style={{
              animation: `progress ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NotificationToast;
