import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import CrowdChart from "../components/CrowdChart";
import ParkingCard from "../components/ParkingCard";
import FoodQueueCard from "../components/FoodQueueCard";
import WeatherCard from "../components/WeatherCard";
import StadiumMap from "../components/StadiumMap";
import AIChat from "../components/AIChat";

const Dashboard = () => {
  const API_URL = useMemo(
    () => (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, ""),
    []
  );
  const SOCKET_URL = useMemo(
    () => (import.meta.env.VITE_SOCKET_URL || "http://localhost:5000").replace(/\/+$/, ""),
    []
  );

  const [stadiumData, setStadiumData] = useState({
    visitors: 0,
    crowd: [],
    parking: { A: 0, B: 0, C: 0 },
    food: [],
    weather: {
      temperature: "--",
      condition: "Loading...",
      humidity: "--",
      windSpeed: "--",
    },
    lastUpdated: null,
    timestamp: null,
  });

  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);
  const [socketId, setSocketId] = useState(null);

  const toNumberOr = (value, fallback = 0) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  };

  const normalizeData = (incoming = {}) => ({
    visitors: toNumberOr(incoming?.visitors, 0),
    crowd: Array.isArray(incoming?.crowd) ? incoming.crowd : [],
    parking:
      incoming?.parking && typeof incoming.parking === "object"
        ? {
            A: toNumberOr(incoming.parking.A, 0),
            B: toNumberOr(incoming.parking.B, 0),
            C: toNumberOr(incoming.parking.C, 0),
          }
        : { A: 0, B: 0, C: 0 },
    food: Array.isArray(incoming?.food) ? incoming.food : [],
    weather:
      incoming?.weather && typeof incoming.weather === "object"
        ? {
            temperature: incoming.weather.temperature ?? "--",
            condition: incoming.weather.condition ?? "N/A",
            humidity: incoming.weather.humidity ?? "--",
            windSpeed: incoming.weather.windSpeed ?? "--",
          }
        : {
            temperature: "--",
            condition: "N/A",
            humidity: "--",
            windSpeed: "--",
          },
  });

  const fetchSnapshot = async () => {
    try {
      setError(null);

      const res = await fetch(`${API_URL}/api/stadium`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to load stadium data`);
      }

      const data = await res.json();
      const normalized = normalizeData(data);

      setStadiumData((prev) => ({
        ...prev,
        ...normalized,
        lastUpdated: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
      }));
    } catch (err) {
      console.error("❌ Snapshot fetch error:", err);
      setError(`Connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnapshot();

    const socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      setConnected(true);
      setReconnecting(false);
      setSocketId(socket.id);
      setError(null);
      console.log("✅ Connected to live updates:", socket.id);
    });

    socket.on("stadiumUpdate", (data) => {
      const normalized = normalizeData(data);

      setStadiumData((prev) => ({
        ...prev,
        ...normalized,
        lastUpdated: new Date().toLocaleTimeString(),
        timestamp: Date.now(),
      }));
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("❌ Disconnected from live updates");
    });

    socket.on("reconnect_attempt", () => {
      setReconnecting(true);
      console.log("🔄 Attempting to reconnect...");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err?.message || err);
      setError("Real-time connection issue. Updates may be delayed.");
    });

    return () => socket.disconnect();
  }, [API_URL, SOCKET_URL]);

  const avgParking = Math.round(
    (toNumberOr(stadiumData?.parking?.A, 0) +
      toNumberOr(stadiumData?.parking?.B, 0) +
      toNumberOr(stadiumData?.parking?.C, 0)) /
      3
  );

  const maxFoodWait = Math.max(
    ...((stadiumData?.food || []).map((f) => toNumberOr(f?.wait, 0))),
    0
  );

  const safeVisitors = toNumberOr(stadiumData?.visitors, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading Stadium Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">🏟️ Smart Stadium AI Dashboard</h1>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              <span className="font-semibold">
                {connected ? "🟢 Live" : reconnecting ? "🟡 Reconnecting..." : "🔴 Offline"}
              </span>
            </div>
            {stadiumData.lastUpdated && <p className="text-gray-600">Updated: {stadiumData.lastUpdated}</p>}
            {socketId && <p className="text-xs text-gray-500">ID: {socketId.substring(0, 8)}</p>}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
            <p className="font-semibold">⚠️ {error}</p>
            <p className="text-sm">Retrying connection automatically...</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Current Crowd</h3>
          <p className="text-3xl md:text-4xl font-bold mt-3 text-blue-600">{safeVisitors.toLocaleString()}</p>
          <span className="text-gray-600 text-xs">People inside stadium</span>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Parking Occupancy</h3>
          <p className="text-3xl md:text-4xl font-bold mt-3 text-orange-600">{avgParking}%</p>
          <span className="text-gray-600 text-xs">Average across all lots</span>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Food Court</h3>
          <p className="text-3xl md:text-4xl font-bold mt-3 text-purple-600">{maxFoodWait} min</p>
          <span className="text-gray-600 text-xs">Max wait time</span>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Weather</h3>
          <p className="text-3xl md:text-4xl font-bold mt-3 text-amber-600">
            {stadiumData?.weather?.temperature ?? "--"}°C
          </p>
          <span className="text-gray-600 text-xs">{stadiumData?.weather?.condition ?? "N/A"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">📊 Crowd Prediction</h2>
          <CrowdChart />
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">🅿️ Parking Status</h2>
          <ParkingCard parking={stadiumData?.parking || { A: 0, B: 0, C: 0 }} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">🍔 Food Court Analytics</h2>
          <FoodQueueCard food={stadiumData?.food || []} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">🌤️ Weather Details</h2>
          <WeatherCard data={stadiumData?.weather || {}} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">🗺️ Stadium Map</h2>
        <StadiumMap parking={stadiumData?.parking || { A: 0, B: 0, C: 0 }} />
      </div>

      <div className="mt-6">
        <AIChat stadiumData={stadiumData} socketId={socketId} />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
        <p>Real-time updates powered by Socket.IO | API: {API_URL}</p>
        <p className="text-xs mt-2">Last full update: {stadiumData.lastUpdated || "Never"}</p>
      </div>
    </div>
  );
};

export default Dashboard;
