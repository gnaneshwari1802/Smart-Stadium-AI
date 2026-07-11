import express from "express";
import stadiumService from "../services/stadiumService.js";

const router = express.Router();

/**
 * GET /api/stadium
 * Returns current live stadium data
 */
router.get("/", (req, res) => {
  try {
    const data = stadiumService.getState();

    res.status(200).json({
      success: true,
      message: "Live stadium data",
      data,
    });
  } catch (error) {
    console.error("Stadium GET Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch stadium data.",
    });
  }
});

/**
 * POST /api/stadium/refresh
 * Forces new telemetry generation
 */
router.post("/refresh", (req, res) => {
  try {
    const data = stadiumService.refresh();

    res.status(200).json({
      success: true,
      message: "Stadium data refreshed successfully.",
      data,
    });
  } catch (error) {
    console.error("Refresh Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to refresh stadium data.",
    });
  }
});

/**
 * GET /api/stadium/health
 * Returns backend health + stadium summary
 */
router.get("/health", (req, res) => {
  try {
    const state = stadiumService.getState();

    res.json({
      success: true,
      server: "Running",
      timestamp: new Date().toISOString(),

      stadium: {
        phase: state.phase,
        visitors: state.visitors,
        occupancy: state.occupancy,
        health: state.stadiumHealth,
      },

      crowd: state.crowd,

      weather: state.weather,

      parking: state.parking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Health endpoint unavailable.",
    });
  }
});

/**
 * GET /api/stadium/parking
 */
router.get("/parking", (req, res) => {
  try {
    res.json({
      success: true,
      parking: stadiumService.getState().parking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

/**
 * GET /api/stadium/weather
 */
router.get("/weather", (req, res) => {
  try {
    res.json({
      success: true,
      weather: stadiumService.getState().weather,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

/**
 * GET /api/stadium/crowd
 */
router.get("/crowd", (req, res) => {
  try {
    res.json({
      success: true,
      crowd: stadiumService.getState().crowd,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

/**
 * GET /api/stadium/food
 */
router.get("/food", (req, res) => {
  try {
    res.json({
      success: true,
      food: stadiumService.getState().food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

/**
 * GET /api/stadium/notifications
 */
router.get("/notifications", (req, res) => {
  try {
    res.json({
      success: true,
      notifications: stadiumService.getState().notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

export default router;