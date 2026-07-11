import axios from "axios";

// Base URL from .env or localhost fallback
const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:5000",
  timeout: 10000,
});

// -------------------------
// Response Interceptor
// -------------------------

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.response) {
      console.error(error.response.data);
    }

    return Promise.reject(error);
  }
);

// -------------------------
// Stadium APIs
// -------------------------

export const getStadiumData = async () => {
  const res = await API.get("/api/stadium");
  return res.data;
};

export const refreshStadium = async () => {
  const res = await API.post("/api/stadium/refresh");
  return res.data;
};

export const getParking = async () => {
  const res = await API.get("/api/stadium/parking");
  return res.data;
};

export const getWeather = async () => {
  const res = await API.get("/api/stadium/weather");
  return res.data;
};

export const getCrowd = async () => {
  const res = await API.get("/api/stadium/crowd");
  return res.data;
};

export const getFood = async () => {
  const res = await API.get("/api/stadium/food");
  return res.data;
};

export const getNotifications = async () => {
  const res = await API.get("/api/stadium/notifications");
  return res.data;
};

// -------------------------
// AI APIs
// -------------------------

export const askAI = async (prompt) => {
  const res = await API.post("/api/ai", {
    prompt,
  });

  return res.data;
};

export const getAISuggestions = async () => {
  const res = await API.get("/api/ai/suggestions");
  return res.data;
};

export default API;