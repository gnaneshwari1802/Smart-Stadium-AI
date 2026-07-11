import { getStadiumData } from "../services/stadiumService.js";

export default function initializeSocket(io) {
  io.on("connection", (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    let clientLocation = { lat: 17.4309, lng: 78.3924 };
    let broadcastInterval = null;
    let isUpdating = false;

    const broadcastUpdate = async () => {
      if (isUpdating) return; // Prevent concurrent updates
      
      isUpdating = true;
      try {
        const stadiumData = await getStadiumData(clientLocation.lat, clientLocation.lng);

        // Broadcast to all connected clients
        io.emit("stadiumUpdate", {
          ...stadiumData,
          timestamp: new Date().toISOString(),
          lastUpdated: new Date().toLocaleTimeString()
        });
      } catch (error) {
        console.error("❌ Broadcast error:", error.message);
        io.emit("error", {
          message: "Failed to fetch stadium data",
          timestamp: new Date().toISOString()
        });
      } finally {
        isUpdating = false;
      }
    };

    // Send initial update immediately
    broadcastUpdate();

    // Broadcast every 10 seconds (10000ms)
    broadcastInterval = setInterval(broadcastUpdate, 10000);

    // Handle location change from client
    socket.on("changeLocation", (newCoords) => {
      try {
        if (newCoords && 
            typeof newCoords.lat === "number" && 
            typeof newCoords.lng === "number" &&
            newCoords.lat >= -90 && newCoords.lat <= 90 &&
            newCoords.lng >= -180 && newCoords.lng <= 180) {
          
          clientLocation = newCoords;
          console.log(`📍 Location changed to: ${newCoords.lat}, ${newCoords.lng}`);
          
          // Immediate update on location change
          broadcastUpdate();
        } else {
          console.warn("⚠️ Invalid coordinates received:", newCoords);
          socket.emit("error", { message: "Invalid coordinates" });
        }
      } catch (error) {
        console.error("❌ Location change error:", error.message);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    // Handle manual refresh request
    socket.on("forceRefresh", () => {
      console.log(`🔄 Force refresh requested by ${socket.id}`);
      broadcastUpdate();
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      if (broadcastInterval) {
        clearInterval(broadcastInterval);
      }
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error(`❌ Socket error from ${socket.id}:`, error);
    });
  });

  // Monitor connection count
  setInterval(() => {
    const clientCount = io.engine.clientsCount;
    if (clientCount > 0) {
      console.log(`📊 Active connections: ${clientCount}`);
    }
  }, 60000);
}