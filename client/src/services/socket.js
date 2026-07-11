import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

let socketInstance = null;

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(SOCKET_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        transports: ["websocket", "polling"],
      });

      socketInstance.on("connect", () => {
        console.log("✅ Socket connected:", socketInstance.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      socketInstance.on("error", (error) => {
        console.error("❌ Socket error:", error);
      });
    }

    socketRef.current = socketInstance;
    return () => {
      // Don't disconnect on unmount, keep singleton
    };
  }, []);

  return socketRef.current;
};

export const getSocket = () => socketInstance;

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export const emitChangeLocation = (lat, lng) => {
  if (socketInstance) {
    socketInstance.emit("changeLocation", { lat, lng });
  }
};

export const emitForceRefresh = () => {
  if (socketInstance) {
    socketInstance.emit("forceRefresh");
  }
};