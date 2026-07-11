import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import stadiumService from "../services/stadiumService.js";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

function buildPrompt(userQuestion) {
  const state = stadiumService.getState();

  return `
You are Smart Stadium AI.

You are an intelligent stadium operations assistant.

Current Stadium Information

------------------------------------

Match Phase:
${state.phase}

Visitors:
${state.visitors}

Capacity:
${state.capacity}

Occupancy:
${state.occupancy}%

Crowd Density:
${state.crowd.density}

Congestion:
${state.crowd.congestionLevel}

Stadium Health:
${state.stadiumHealth}

Weather

Temperature:
${state.weather.temperature}°C

Condition:
${state.weather.condition}

Humidity:
${state.weather.humidity}%

Wind Speed:
${state.weather.windSpeed} km/h

Parking

Lot A: ${state.parking.A}% occupied
Lot B: ${state.parking.B}% occupied
Lot C: ${state.parking.C}% occupied
Lot D: ${state.parking.D}% occupied

Food Queues

${state.food
  .map((f) => `${f.name}: ${f.wait} minutes`)
  .join("\n")}

Notifications

${
  state.notifications.length
    ? state.notifications.map((n) => "- " + n.message).join("\n")
    : "No active alerts"
}

------------------------------------

Instructions

1. Answer ONLY using the stadium information above.
2. Never invent information.
3. Keep answers short and practical.
4. Recommend the least occupied parking lot.
5. Recommend the food stall with the shortest waiting time.
6. Give crowd advice if occupancy > 80%.
7. Give weather advice if temperature > 35°C.
8. End with one useful recommendation.

Visitor Question:

${userQuestion}
`;
}

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const result = await model.generateContent(buildPrompt(prompt));

    const answer = result.response.text();

    res.json({
      success: true,
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log("\n========== GEMINI ERROR ==========");
    console.error(error);
    console.log("==================================\n");

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/health", (req, res) => {
  res.json({
    success: true,
    ai: "Gemini 2.5 Flash",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

router.get("/suggestions", (req, res) => {
  const state = stadiumService.getState();

  const leastParking = Object.entries(state.parking).sort(
    (a, b) => a[1] - b[1]
  )[0];

  const fastestFood = [...state.food].sort(
    (a, b) => a.wait - b.wait
  )[0];

  res.json({
    success: true,
    parkingRecommendation: {
      lot: leastParking[0],
      occupancy: leastParking[1],
    },
    foodRecommendation: fastestFood,
    crowd: state.crowd,
    weather: state.weather,
    stadiumHealth: state.stadiumHealth,
  });
});

export default router;